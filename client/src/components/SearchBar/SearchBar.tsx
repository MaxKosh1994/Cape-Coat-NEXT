import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import styles from './SearchBarStyle.module.css';
import { IItem } from '../accComp/orders/types';
import { getAllItems } from './fetchSearch';
import useMediaQuery from '@mui/material/useMediaQuery';

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const isTablet = useMediaQuery('(max-width:768px)');

  const [isInputOpen, setIsInputOpen] = useState(false);

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    marginLeft: isTablet ? '110px' : '0',
    color: 'black',
    width: isTablet ? '123px' : '150px',
    transition: theme.transitions.create('width'),
  }));

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    paddingTop: '6px',
    paddingRight: '2px',
    marginLeft: isInputOpen ? '-150px' : '0',
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

  const filteredItems: IItem[] = allItems.filter((item) => {
    return (
      item.name.toLowerCase().includes(input.toLowerCase()) ||
      item.article.toString().toLowerCase().includes(input.toLowerCase())
    );
  });

  return (
    <Search>
      <StyledIconButton onClick={() => setIsInputOpen(!isInputOpen)}>
        {isTablet ? (
          <span
            className={styles.headerSearch}
            style={{ color: '#423C3D', marginLeft: '6px' }}
          >
            Поиск
          </span>
        ) : (
          <SearchIcon className={styles.headerSearchIcon} />
        )}
      </StyledIconButton>
      {isInputOpen && (
        <StyledInputBase
          placeholder="Поиск..."
          autoFocus
          onBlur={() => setIsInputOpen(false)}
        />
      )}
    </Search>
  );
};

export default SearchBar;
