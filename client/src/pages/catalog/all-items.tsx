import { useState, useEffect } from 'react';
import BasePage from '@/components/ItemPage/BasePage';
import Custom404 from '../404';

export default function AllItemsPage() {
  const [allItems, setAllItems] = useState([]);
  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + 'item/allItems'
        );
        if (response.status === 200) {
          const result = await response.json();
          const items = result.map((item) => ({
            ...item,
            isFavorite: false,
            isCart: false,
          }));
          setAllItems(items);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {allItems.length ? (
        <BasePage pageName="Все товары" itemsArr={allItems} />
      ) : (
        <Custom404 />
      )}
    </>
  );
}
