import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import InputBase from '@mui/material/InputBase';

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isInputOpen, setIsInputOpen] = useState(false);

  const Search = styled('div')(({ theme }) => ({
    borderRadius: isInputOpen ? theme.shape.borderRadius : 'unset',
    backgroundColor: isInputOpen
      ? alpha(theme.palette.common.black, 0.15)
      : 'unset',
    position: 'relative',
    marginLeft: isInputOpen ? '0' : theme.spacing(1),
    width: isInputOpen ? '100%' : 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: isInputOpen ? '0' : theme.spacing(1),
      position: isMobile ? 'absolute' : 'relative',
      right: 0,
      width: isInputOpen ? '100%' : 'auto',
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      color: 'black',
      // padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: isInputOpen ? 'calc(100% - 32px)' : '12ch',
      marginLeft: isInputOpen ? '-45px' : '0',
      [theme.breakpoints.up('sm')]: {
        width: isInputOpen ? 'calc(100% - 32px)' : '20ch',
      },
    },
  }));

  return (
    <Search onClick={() => setIsInputOpen(true)}>
      <IconButton
        size="large"
        aria-label="search"
        color="inherit"
        sx={{
          padding: isMobile ? '3px' : '8px',
        }}
      >
        <SearchIcon sx={{ color: 'black' }} />
      </IconButton>

      {isInputOpen && (
        <StyledInputBase
          autoFocus
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onBlur={() => setIsInputOpen(false)}
        />
      )}
    </Search>
  );
};

export default SearchBar;
