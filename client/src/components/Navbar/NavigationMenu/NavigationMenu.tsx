import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './NavigationComp.module.css';
import {
  fetchNavigationMenuCategoryData,
  fetchNavigationMenuCollectionData,
} from './fetchNavigationMenuData';

interface IProps {
  isScrolled: boolean;

  onSearchIconClick: () => void;
}

interface ICategories {
  id: number;
  name: string;
  photo: string;
  link: string;
  urlName: string;
}

interface ICollections {
  id: number;
  name: string;
  photo: string;
  description: string;
  current: boolean;
  link: string;
  urlName: string;
}

interface IFaqMenuItem {
  id: number;
  name: string;
  collections?: ICollections[];
  link: string;
  urlName?: string;
}

interface IMenuItem {
  label: string;
  link?: string;
  submenu?: (ICategories | ICollections | IFaqMenuItem)[];
}

const NavigationMenu: React.FC<IProps> = ({
  isScrolled,

  onSearchIconClick,
}) => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const [submenuStates, setSubmenuStates] = useState<{
    [index: number]: boolean;
  }>({});

  const [categories, setCategories] = useState<ICategories[]>([]);
  const [collections, setCollections] = useState<ICollections[]>([]);

  useEffect(() => {
    const getData = async () => {
      const categoryData = await fetchNavigationMenuCategoryData();
      setCategories(categoryData.categories);

      const collectionsData = await fetchNavigationMenuCollectionData();
      setCollections(collectionsData.collections);
    };

    getData();
  }, []);
  const faqSubMenu: IFaqMenuItem[] = [
    { id: 1, name: 'Как оформить заказ', link: '/FAQ/orderFAQ' },
    { id: 2, name: 'Как снять мерки', link: '/FAQ/measurementsFAQ' },
    { id: 3, name: 'Как оформить доставку', link: '/FAQ/deliveryFAQ' },
    { id: 4, name: 'Как оформить возврат', link: '/FAQ/returnFAQ' },
  ];

  const menuItems: IMenuItem[] = [
    { label: 'О бренде', link: '/about' },
    { label: 'Каталог', link: '/catalog', submenu: categories },
    { label: 'Коллекции', link: '/catalog/collection', submenu: collections },
    { label: 'Sale', link: '/catalog/sale' },
    { label: 'FAQ', link: '/FAQ/orderFAQ', submenu: faqSubMenu },
    { label: 'Контакты', link: '/address' },
  ];

  const handleMouseEnter = (index: number) => {
    setSubmenuStates((prevState) => ({ ...prevState, [index]: true }));
    onSearchIconClick();
  };

  const handleMouseLeave = (index: number) => {
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
          <>
            <Link href={item.link || '#'} passHref className={styles.menuLink}>
              {item.label}
            </Link>
            {item.submenu && (
              <ul
                className={`${styles.dropdownMenu} ${
                  submenuStates[index] ? styles.dropdownVisible : ''
                }`}
              >
                {item.submenu.map((el) => (
                  <li key={el.id} className={styles.dropdownMenuItem}>
                    {el.link ? (
                      <Link href={el.link} passHref>
                        {el.name}
                      </Link>
                    ) : (
                      <Link
                        href={{
                          pathname: `${item.link}/${el.urlName}`,
                          // query: { id: el.id },
                        }}
                        passHref
                      >
                        {el.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        </li>
      ))}
    </ul>
  );
};

export default NavigationMenu;
