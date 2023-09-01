import React from 'react';
import Navbar from '../Navbar/Navbar';
import Script from 'next/script';
import Footer from '../Footer/Footer';
import Social from '../Social/Social';
import { useRouter } from 'next/router';
import MyCookieConsent from '../cookieConsent/CookieConsent';

const Layout = ({ children }) => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  return (
    <div style={{ overflow: 'hidden' }}>
      <Script src="https://smtpjs.com/v3/smtp.js"></Script>
      <Social />
      <Navbar />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          marginTop: !isHomePage ? '100px' : '0',
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
