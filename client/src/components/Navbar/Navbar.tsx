import React, { useEffect, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import Image from 'next/image';
import { grey } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Person2Icon from '@mui/icons-material/Person2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AddShoppingCart } from '@mui/icons-material';
import logo from './logoStore.svg';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchBar from '../SearchBar/SearchBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useAppDispatch } from '../../app/hooks';
import { isUserLoginThunk } from '../../app/thunkActionsAuth';
import { fetchFavouritesData } from '../../app/thunkActionsFavourite';
import { checkCartItemThunk } from '../../app/thunkActionsCart';
import './navbarStyle.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    error: {
      main: '#f44336',
    },
  },
});

function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const easeOutQuart = (progress) => 1 - Math.pow(1 - progress, 4);
const easeInQuart = (progress) => progress ** 4;
const handleScrollAndHighlight = () => {
  const scrollToBottom = () => {
    const currentPosition = window.pageYOffset;
    const targetPosition = document.body.scrollHeight;
    const distance = targetPosition - currentPosition;
    const duration = 1000;
    const startTime = performance.now();

    const scrollStep = (timestamp) => {
      const elapsedTime = timestamp - startTime;
      let progress = elapsedTime / duration;

      if (progress < 0.5) {
        progress = easeInQuart(progress * 2) / 2;
      } else {
        progress = easeOutQuart((progress - 0.5) * 2) / 2 + 0.5;
      }

      const easing = progress;
      window.scrollTo(0, currentPosition + distance * easing);

      if (elapsedTime < duration) {
        requestAnimationFrame(scrollStep);
      }
    };

    requestAnimationFrame(scrollStep);
  };

  setTimeout(scrollToBottom, 100);
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const muiTheme = createTheme(theme);
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const router = useRouter();
  const isHomePage = router.pathname === '/home';

  const dispatch = useAppDispatch();
  const isUserLogin = useSelector(
    (state: RootState) => state.sessionSlice.session
  );
  const user = useSelector((state: RootState) => state.sessionSlice.user);
  const isAdmin = useSelector((state: RootState) => state.sessionSlice.isAdmin);
  const favouriteItems = useSelector(
    (state: RootState) => state.favouriteSlice.favourites
  );
  const cartItems = useSelector(
    (state: RootState) => state.cartSlice.cartItems
  );

  const [amountOfLikes, setAmountOfLikes] = useState(0);
  const [amountOfCartItem, setAmountOfCartItem] = useState(0);

  useEffect(() => {
    if (isUserLogin) {
      dispatch(fetchFavouritesData());
      dispatch(checkCartItemThunk());
    }
  }, [isUserLogin, user, dispatch]);

  useEffect(() => {
    dispatch(isUserLoginThunk());
  }, [dispatch]);

  useEffect(() => {
    setAmountOfLikes(favouriteItems.length);
  }, [favouriteItems]);

  useEffect(() => {
    setAmountOfCartItem(cartItems.length);
  }, [cartItems]);

  const iconColour = grey[900];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    ></Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
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
      <Link href="/about" passHref>
        <MenuItem
          style={{ fontSize: '24px', fontFamily: 'Ysabeau Infant' }}
          onClick={handleMobileMenuClose}
        >
          О бренде
        </MenuItem>
      </Link>
      <Link href="/account/favorites" passHref>
        <MenuItem
          style={{ fontSize: '24px', fontFamily: 'Ysabeau Infant' }}
          onClick={handleMobileMenuClose}
        >
          Избранное
        </MenuItem>
      </Link>
      <Link href="/catalog" passHref>
        <MenuItem
          style={{ fontSize: '24px', fontFamily: 'Ysabeau Infant' }}
          onClick={handleMobileMenuClose}
        >
          Каталог
        </MenuItem>
      </Link>
      <Link href="/catalog/collection" passHref>
        <MenuItem
          style={{ fontSize: '24px', fontFamily: 'Ysabeau Infant' }}
          onClick={handleMobileMenuClose}
        >
          Коллекция
        </MenuItem>
      </Link>
      <Link href="/sale" passHref>
        <MenuItem
          style={{ fontSize: '24px', fontFamily: 'Ysabeau Infant' }}
          onClick={handleMobileMenuClose}
        >
          Sale
        </MenuItem>
      </Link>
      <Link href="/FAQ" passHref>
        <MenuItem
          style={{ fontSize: '24px', fontFamily: 'Ysabeau Infant' }}
          onClick={handleMobileMenuClose}
        >
          FAQ
        </MenuItem>
      </Link>
      <MenuItem
        style={{ fontSize: '24px', fontFamily: 'Ysabeau Infant' }}
        onClick={() => {
          handleScrollAndHighlight();
          handleMobileMenuClose();
        }}
      >
        Контакты
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <ElevationScroll>
          <AppBar
            className={`navbar ${isScrolled ? 'scrolled' : ''}`}
            component="nav"
            sx={{
              minHeight: 70,
            }}
          >
            <Toolbar
              sx={{
                padding: '16px 5px',
                justifyContent: 'space-between',
              }}
            >
              <Link href="/" passHref>
                <Box
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src={logo}
                    alt="Logo"
                    priority={true}
                    style={{
                      width: '200px',
                      height: '30px',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </Link>

              <Box
                sx={{
                  display: {
                    margin: '0px',
                    xs: 'none',
                    color: iconColour,
                    md: 'flex',
                    justifyContent: 'center',
                  },
                }}
              >
                <Link href="/about" passHref>
                  <MenuItem
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    <p className="nav-menu">О бренде</p>
                  </MenuItem>
                </Link>
                <Link href="/catalog" passHref>
                  <MenuItem
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    <p className="nav-menu">Каталог</p>
                  </MenuItem>
                </Link>
                <Link href="/catalog/collection" passHref>
                  <MenuItem
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    <p className="nav-menu">Коллекция</p>
                  </MenuItem>
                </Link>
                <Link href="/sale" passHref>
                  <MenuItem
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    <p className="nav-menu">Sale</p>
                  </MenuItem>
                </Link>
                <Link href="/FAQ" passHref>
                  <MenuItem
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    <p className="nav-menu">FAQ</p>
                  </MenuItem>
                </Link>
                <MenuItem
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <p onClick={handleScrollAndHighlight} className="nav-menu">
                    Контакты
                  </p>
                </MenuItem>
              </Box>
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                }}
              >
                <SearchBar />
                <Link
                  href={
                    isUserLogin
                      ? isAdmin
                        ? '/admin/orders'
                        : '/account/profile'
                      : '/signin'
                  }
                  passHref
                >
                  <IconButton
                    size="large"
                    sx={{ color: iconColour, padding: '8px' }}
                  >
                    <Person2Icon />
                  </IconButton>
                </Link>
                <Link href="/account/favorites" passHref>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    sx={{ color: iconColour, padding: '8px' }}
                  >
                    <Badge badgeContent={amountOfLikes} color="error">
                      <FavoriteIcon />
                    </Badge>
                  </IconButton>
                </Link>
                <Link href={isUserLogin ? '/cart' : '/signin'} passHref>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    sx={{ color: iconColour, padding: '8px' }}
                  >
                    <Badge badgeContent={amountOfCartItem} color="error">
                      <AddShoppingCart />
                    </Badge>
                  </IconButton>
                </Link>
              </Box>

              <Box
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  sx={{ color: iconColour, padding: '8px' }}
                >
                  <MenuIcon />
                </IconButton>
                <Link href="/" passHref>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Image
                      src={logo}
                      alt="Logo"
                      priority={true}
                      style={{
                        width: '200px',
                        height: '30px',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <SearchBar />
                  <Link
                    href={
                      isUserLogin
                        ? isAdmin
                          ? '/admin/orders'
                          : '/account/profile'
                        : '/signin'
                    }
                    passHref
                  >
                    <IconButton
                      size="large"
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      sx={{
                        color: iconColour,
                        padding: isMobile ? '3px' : '10px',
                      }}
                    >
                      <Badge color="error">
                        <Person2Icon />
                      </Badge>
                    </IconButton>
                  </Link>
                  <Link href={isUserLogin ? '/cart' : '/signin'} passHref>
                    <IconButton
                      size="large"
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      sx={{
                        color: iconColour,
                        padding: isMobile ? '3px' : '10px',
                        paddingRight: '15px',
                      }}
                    >
                      <Badge badgeContent={amountOfCartItem} color="error">
                        <AddShoppingCart />
                      </Badge>
                    </IconButton>
                  </Link>
                </div>
              </Box>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar sx={isHomePage ? {} : { height: 130 }} />
      </Box>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}
