import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import styles from './SearchBarStyle.module.css';
import { IItem } from '../accComp/orders/types';
import { getAllItems } from './fetchSearch';
import SearchContainer from '../SearchContainer/SearchContainer';

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    width: '150px', // Adjust the width value
    transition: theme.transitions.create('width'),
  }));

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    paddingTop: '6px',
    paddingRight: '2px',
    marginLeft: isInputOpen ? '-150px' : '0', // Adjust the value
    transition: theme.transitions.create('margin-left'),
  }));

  const [input, setInput] = useState('');
  const [allItems, setAllItems] = useState<IItem[]>([]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

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

  const filteredItems: IItem[] = allItems.filter((item) => {
    return (
      item.name.toLowerCase().includes(input.toLowerCase()) ||
      item.article.toString().toLowerCase().includes(input.toLowerCase())
    );
  });

  return (
    <>
      <Search>
        <StyledIconButton onClick={() => setIsInputOpen(!isInputOpen)}>
          <SearchIcon
            className={styles.headerSearchIcon}
            style={{ color: 'black' }}
          />
        </StyledIconButton>
        {isInputOpen && (
          <StyledInputBase
            value={input}
            onChange={changeHandler}
            placeholder='Search...'
            autoFocus
            inputProps={{ 'aria-label': 'search' }}
            onBlur={() => {
              setIsInputOpen(false);
              setInput('');
            }}
          />
        )}
      </Search>
      {input.length > 0 && <SearchContainer filteredItems={filteredItems} />}
    </>
  );
};

export default SearchBar;
