import React from 'react';
import Navbar from '../Navbar/Navbar';
import Script from 'next/script';

const Layout = ({ children }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Script src="https://smtpjs.com/v3/smtp.js"></Script>
      <Navbar />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default Layout;
