import { useState, useEffect } from 'react';
import BasePage from '@/components/ItemPage/BasePage';

export default function BestsellersPage() {
  const [bestsellerItems, setBestsellerItems] = useState([]);
  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + 'catalog/bestsellers'
        );
        if (response.status === 200) {
          const items = await response.json();
          setBestsellerItems(items);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return <BasePage pageName="Bestsellers" itemsArr={bestsellerItems} />;
}
