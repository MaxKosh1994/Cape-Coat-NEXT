import { useState, useEffect } from 'react';
import BasePage from '@/components/ItemPage/BasePage';

export default function AllItemsPage() {
  const [allItems, setAllItems] = useState([]);
  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + 'item/allItems'
        );
        if (response.status === 200) {
          const items = await response.json();
          setAllItems(items);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);
  console.log(allItems);

  return <BasePage pageName="Все товары" itemsArr={allItems} />;
}
