import React, { ChangeEvent, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import styles from './SearchBarStyle.module.css';
import { IItem } from '../accComp/orders/types';
import { getAllItems } from './fetchSearch';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchContainer from '../SearchContainer/SearchContainer';

interface SearchBarProps {
  onSearchIconClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchIconClick }) => {
  const isMobile = useMediaQuery('(max-width:768px)');

  const [isInputOpen, setIsInputOpen] = useState(false);

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    position: isMobile ? 'fixed' : 'unset',
    padding: isMobile ? '15px' : 0,
    top: isMobile ? '55px' : 'unset',
    left: isInputOpen ? '0' : '100%',
    color: 'black',
    width: isMobile ? '100%' : '150px',
    transition: theme.transitions.create('width'),
    backgroundColor: isMobile ? 'white' : 'transparent',
  }));

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    paddingTop: '6px',
    paddingRight: '2px',
    marginLeft: isMobile ? '0' : '10px',
    transition: theme.transitions.create('margin-left'),
  }));

  const [input, setInput] = useState('');
  const [allItems, setAllItems] = useState<IItem[]>([]);

  useEffect(() => {
    if (input.length > 0) {
      const fetchData = async () => {
        try {
          const data = await getAllItems();
          setAllItems(data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [input]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSearchIconClick = () => {
    setIsInputOpen(!isInputOpen);
    onSearchIconClick();
  };

  const filteredItems: IItem[] = allItems.filter((item) => {
    return (
      item.name.toLowerCase().includes(input.toLowerCase()) ||
      item.article.toString().toLowerCase().includes(input.toLowerCase())
    );
  });

  return (
    <>
      <Search>
        <StyledIconButton onClick={handleSearchIconClick}>
          <SearchIcon className={styles.headerSearchIcon} />
        </StyledIconButton>
        {isInputOpen && (
          <StyledInputBase
            value={input}
            onChange={changeHandler}
            placeholder="Поиск..."
            autoFocus
            inputProps={{ 'aria-label': 'search' }}
            onBlur={() => {
              setIsInputOpen(false);
              setInput('');
              onSearchIconClick();
            }}
          />
        )}
      </Search>
      {input.length > 0 && <SearchContainer filteredItems={filteredItems} />}
    </>
  );
};

export default SearchBar;
