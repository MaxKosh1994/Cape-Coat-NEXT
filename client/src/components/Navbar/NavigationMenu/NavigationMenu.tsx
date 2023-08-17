import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './NavigationComp.module.css';
import { fetchNavigationMenuData } from './fetchNavigationMenuData';

interface IProps {
  isScrolled: boolean;
  handleMobileMenuClose: () => void;
  handleScrollAndHighlight: () => void;
}

const NavigationMenu: React.FC<IProps> = ({
  isScrolled,
  handleScrollAndHighlight,
  onSearchIconClick,
}) => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const [submenuStates, setSubmenuStates] = useState({});

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchNavigationMenuData();
      setOrders(data.orders);
    };

    getData();
  }, []);

  const menuItems = [
    { label: 'О бренде', link: '/about' },
    { label: 'Каталог', link: '/catalog', submenu: orders },
    { label: 'Коллекция', link: '/catalog/collection' },
    { label: 'Sale', link: '/sale' },
    { label: 'FAQ', link: '/FAQ' },
    { label: 'Контакты', onClick: handleScrollAndHighlight },
  ];

  const handleMouseEnter = (index) => {
    setSubmenuStates((prevState) => ({ ...prevState, [index]: true }));
    onSearchIconClick();
  };

  const handleMouseLeave = (index) => {
    setSubmenuStates((prevState) => ({ ...prevState, [index]: false }));
    onSearchIconClick();
  };

  return (
    <ul className={isScrolled ? `${styles.menu} ${styles.fix}` : styles.menu}>
      {menuItems.map((item, index) => (
        <li
          key={index}
          className={styles.menuItem}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          {item.onClick ? (
            <Link href="#" onClick={item.onClick} className={styles.menuLink}>
              {item.label}
            </Link>
          ) : (
            <>
              <Link
                href={item.link || '#'}
                passHref
                className={styles.menuLink}
              >
                {item.label}
              </Link>
              {item.submenu && (
                <ul
                  className={`${styles.dropdownMenu} ${
                    submenuStates[index] ? styles.dropdownVisible : ''
                  }`}
                >
                  {item.submenu.map((order, orderIndex) => (
                    <li key={orderIndex} className={styles.dropdownMenuItem}>
                      <Link href={`/catalog/${order.name}`} passHref>
                        {order.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavigationMenu;
