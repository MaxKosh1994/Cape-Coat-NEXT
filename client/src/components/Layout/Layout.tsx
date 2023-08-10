import React from 'react';
import Navbar from '../Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Navbar />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default Layout;
