import React from 'react';
import Navbar from '../Navbar/Navbar';
import Script from 'next/script';
import Footer from '../Footer/Footer';
import Social from '../Social/Social';
import { useRouter } from 'next/router';
import MyCookieConsent from '../cookieConsent/CookieConsent';
import { useMediaQuery } from '@mui/material';

const Layout = ({ children }) => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div style={{ overflow: 'hidden' }}>
      <Script src="https://smtpjs.com/v3/smtp.js"></Script>
      <Social />
      <Navbar />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          marginTop: isHomePage ? '0' : isMobile ? '75px' : '100px',
        }}
      >
        {children}
      </div>
      <Footer />
      <MyCookieConsent />
    </div>
  );
};

export default Layout;
