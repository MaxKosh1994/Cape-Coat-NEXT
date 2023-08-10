import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Link href="/search" passHref>
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
      </Link>
    </>
  );
};

export default SearchBar;
