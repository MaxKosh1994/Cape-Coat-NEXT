import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';

interface IMobileMenuProps {
  mobileMoreAnchorEl: null | HTMLElement;
  isMobileMenuOpen: boolean;
  handleMobileMenuClose: () => void;

  onSearchIconClick: () => void;
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
}) => {
  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <Menu
      sx={{
        top: '8px',
        left: '-18px',
        overflow: 'hidden',
        '& .MuiPaper-root': { borderRadius: 0, boxShadow: 'unset' },
      }}
      anchorEl={mobileMoreAnchorEl}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MobileMenuItem
        label="О бренде"
        link="/about"
        onClick={handleMobileMenuClose}
      />
      <MobileMenuItem
        label="Избранное"
        link="/favorites"
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
        link="/catalog/sale"
        onClick={handleMobileMenuClose}
      />
      <MobileMenuItem
        label="FAQ"
        link="/FAQ/orderFAQ"
        onClick={handleMobileMenuClose}
      />
      <MobileMenuItem
        label="Контакты"
        link="/address"
        onClick={handleMobileMenuClose}
      />
    </Menu>
  );
};

export default MobileMenu;
