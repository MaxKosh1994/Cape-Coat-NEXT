import React from 'react';
import { MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface IProps {
  isScrolled: boolean;
  handleMobileMenuClose: () => void;
  handleScrollAndHighlight: () => void;
}

const NavigationMenu: React.FC<IProps> = ({
  isScrolled,
  handleScrollAndHighlight,
}) => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  const menuItems = [
    { label: 'О бренде', link: '/about' },
    { label: 'Каталог', link: '/catalog' },
    { label: 'Коллекция', link: '/catalog/collection' },
    { label: 'Sale', link: '/sale' },
    { label: 'FAQ', link: '/FAQ' },
    { label: 'Контакты', onClick: handleScrollAndHighlight },
  ];

  return (
    <>
      {menuItems.map((item, index) => (
        <Link
          style={{ textDecoration: 'none' }}
          href={item.link || '#'}
          passHref
          key={index}
        >
          <MenuItem
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },

              fontSize: '23px',
              color:
                isHomePage && isScrolled
                  ? 'black'
                  : isHomePage
                  ? 'white'
                  : 'black',
            }}
            onClick={item.onClick}
          >
            <p className="nav-menu">{item.label}</p>
          </MenuItem>
        </Link>
      ))}
    </>
  );
};

export default NavigationMenu;
