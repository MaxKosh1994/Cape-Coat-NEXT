import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import styles from './SearchBarStyle.module.css';

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

  return (
    <Search>
      <StyledIconButton onClick={() => setIsInputOpen(!isInputOpen)}>
        <SearchIcon
          className={styles.headerSearchIcon}
          style={{ color: 'black' }}
        />
      </StyledIconButton>
      {isInputOpen && (
        <StyledInputBase
          placeholder="Search..."
          autoFocus
          onBlur={() => setIsInputOpen(false)}
        />
      )}
    </Search>
  );
};

export default SearchBar;
