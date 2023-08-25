import React, { useEffect, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
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
import NavigationMenu from './NavigationMenu/NavigationMenu';
import MobileMenu from './MobileMenu/MobileMenu';
import CartMin from '../Cart/CartMin';

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

const easeOutQuart = (progress: number) => 1 - Math.pow(1 - progress, 4);
const easeInQuart = (progress: number) => progress ** 4;
const handleScrollAndHighlight = () => {
  const scrollToBottom = () => {
    const currentPosition = window.pageYOffset;
    const targetPosition = document.body.scrollHeight;
    const distance = targetPosition - currentPosition;
    const duration = 1000;
    const startTime = performance.now();

    const scrollStep = (timestamp: number) => {
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

  const isMobile = useMediaQuery('(max-width:1095px)');

  const router = useRouter();
  const dispatch = useAppDispatch();
  const isUserLogin = useSelector(
    (state: RootState) => state.sessionSlice.session
  );

  const isAdmin = useSelector((state: RootState) => state.sessionSlice.isAdmin);
  const favouriteItems = useSelector(
    (state: RootState) => state.favouriteSlice.favourites
  );
  const cartItems = useSelector(
    (state: RootState) => state.cartSlice.cartItems
  );

  const [amountOfLikes, setAmountOfLikes] = useState(0);
  const [amountOfCartItem, setAmountOfCartItem] = useState(0);
  const [isNavbarWhite, setIsNavbarWhite] = useState(false);
  const onSearchIconClick = () => {
    setIsNavbarWhite(!isNavbarWhite);
  };

  useEffect(() => {
    if (isUserLogin) {
      dispatch(isUserLoginThunk());
      dispatch(fetchFavouritesData());
      dispatch(checkCartItemThunk());
    }
  }, [dispatch, isUserLogin]);

  useEffect(() => {
    dispatch(isUserLoginThunk());
  }, [dispatch]);

  useEffect(() => {
    setAmountOfLikes(favouriteItems.length);
  }, [favouriteItems]);

  useEffect(() => {
    setAmountOfCartItem(cartItems.length);
  }, [cartItems]);

  const iconColour = '#423C3D';

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    setIsNavbarWhite(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [showCart, setShowCart] = useState(false);
  const [prevAsPath, setPrevAsPath] = useState(router.asPath);

  const handleCartIconClick = (e: MouseEvent<HTMLButtonElement>) => {
    setShowCart((prev) =>
      prev
        ? !prev
        : setTimeout(() => {
            !prev;
          }, 1001)
    );
  };

  useEffect(() => {
    if (router.asPath !== prevAsPath) {
      setShowCart(false);
      setPrevAsPath(router.asPath);
    }
  }, [router.asPath, prevAsPath]);

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

  return (
    <>
      <div
        className={isScrolled ? 'header fix' : 'header'}
        style={{
          paddingTop: isMobile ? '5px' : '21px',
          height: isMobile ? '55px' : '68px',
          backgroundColor:
            isScrolled || isNavbarWhite ? '#FFFFFF' : 'transparent',
        }}
      >
        <div className="wrap">
          {isMobile && (
            <IconButton
              className="burger"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={(event) => {
                handleMobileMenuOpen(event);
                onSearchIconClick();
              }}
              style={{ position: 'absolute', top: '6px', left: '20px' }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Link href="/" passHref>
            <Image
              src={logo}
              alt="Logo"
              priority={true}
              className="logo"
              style={{
                width: '200px',
                height: '30px',
                objectFit: 'cover',
                marginBottom: isMobile ? '5px' : '0',
                marginTop: isMobile && '0',
              }}
            />
          </Link>
          {!isMobile && (
            <NavigationMenu
              isScrolled={isScrolled}
              handleScrollAndHighlight={handleScrollAndHighlight}
              onSearchIconClick={onSearchIconClick}
            />
          )}
          <div
            className={`${
              isScrolled && !isMobile ? 'header-right fix' : 'header-right'
            }`}
          >
            <SearchBar onSearchIconClick={onSearchIconClick} />

            <Link
              className="header-personal"
              href={
                isUserLogin
                  ? isAdmin
                    ? '/admin/orders'
                    : '/account'
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
            <Link className="header-favorite" href="/favorites" passHref>
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
            {/* <Link
              className="header-basket"
              href={isUserLogin ? '/cart' : '/signin'}
              passHref
            > */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              sx={{ color: iconColour, padding: '8px' }}
              onClick={handleCartIconClick}
            >
              <Badge badgeContent={amountOfCartItem} color="error">
                <AddShoppingCart />
              </Badge>
            </IconButton>
            {/* </Link> */}

            <a href="javascript:;" className="search-ico"></a>
          </div>
        </div>
      </div>

      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleScrollAndHighlight={handleScrollAndHighlight}
        onSearchIconClick={onSearchIconClick}
      />
      {renderMenu}
      {showCart && (
        <CartMin show={showCart} handleCartIconClick={handleCartIconClick} />
      )}
    </>
  );
}
