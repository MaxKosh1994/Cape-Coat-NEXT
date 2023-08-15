import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './NavigationComp.module.css';

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
    <ul className={isScrolled ? `${styles.menu} ${styles.fix}` : styles.menu}>
      {menuItems.map((item, index) => (
        <li key={index} className={styles.menuItem}>
          <Link href={item.link || '#'} passHref className={styles.menuLink}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavigationMenu;
