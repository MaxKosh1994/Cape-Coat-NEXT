import React from 'react';
import Navbar from '../Navbar/Navbar';
import Script from 'next/script';
import Footer from '../Footer/Footer';
import Social from '../Social/Social';

const Layout = ({ children }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Script src='https://smtpjs.com/v3/smtp.js'></Script>
      <Social />
      <Navbar />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
