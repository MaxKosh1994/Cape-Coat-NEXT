import React, { useState, useEffect } from 'react';
import styles from './ToTopArrow.module.css';
import { useMediaQuery } from '@mui/material';

const BackToTopArrow = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isNotDesktop = useMediaQuery('(max-width:1000px)');

  useEffect(() => {
    const scrollListener = () => {
      1;
      if (window.scrollY > 300 && !isNotDesktop) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`${styles.backToTop} ${isVisible ? styles.show : ''}`}
      onClick={scrollToTop}
    >
      <a href="#">^</a>
    </div>
  );
};

export default BackToTopArrow;
