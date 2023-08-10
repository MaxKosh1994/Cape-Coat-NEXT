import React from 'react';
import Navbar from '../Navbar/Navbar';
import Script from 'next/script';

const Layout = ({ children }) => {
  return (
    <div>
      <Script src="https://smtpjs.com/v3/smtp.js"></Script>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
