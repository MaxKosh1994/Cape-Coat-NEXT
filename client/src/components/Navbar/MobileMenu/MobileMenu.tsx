import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useMediaQuery } from '@mui/material';

interface IMobileMenuProps {
  mobileMoreAnchorEl: null | HTMLElement;
  isMobileMenuOpen: boolean;
  handleMobileMenuClose: () => void;
  handleScrollAndHighlight: () => void;
}

interface IMenuItemProps {
  label: string;
  link?: string;
  onClick?: () => void;
}

const MobileMenuItem: React.FC<IMenuItemProps> = ({ label, link, onClick }) => {
  return (
    <Link href={link || '#'} passHref>
      <MenuItem
        style={{ fontSize: '24px', fontFamily: 'Ysabeau Infant' }}
        onClick={onClick}
      >
        {label}
      </MenuItem>
    </Link>
  );
};

const MobileMenu: React.FC<IMobileMenuProps> = ({
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
  handleScrollAndHighlight,
}) => {
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const isMobile = useMediaQuery('(max-width:768px)');
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MobileMenuItem
        label="О бренде"
        link="/about"
        onClick={handleMobileMenuClose}
      />
      <MobileMenuItem
        label="Каталог"
        link="/catalog"
        onClick={handleMobileMenuClose}
      />
      <MobileMenuItem
        label="Коллекция"
        link="/catalog/collection"
        onClick={handleMobileMenuClose}
      />
      <MobileMenuItem
        label="Sale"
        link="/sale"
        onClick={handleMobileMenuClose}
      />
      <MobileMenuItem label="FAQ" link="/FAQ" onClick={handleMobileMenuClose} />
      <MobileMenuItem
        label="Контакты"
        onClick={() => {
          handleScrollAndHighlight();
          handleMobileMenuClose();
        }}
      />
      {isMobile && <SearchBar />}
    </Menu>
  );
};

export default MobileMenu;
