import { useState, useEffect } from 'react';
import BasePage from '@/components/ItemPage/BasePage';
import Custom404 from '../404';

export default function SalePage() {
  const [saleItems, setSaleItems] = useState([]);
  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + 'catalog/sale'
        );
        if (response.status === 200) {
          const result = await response.json();
          const items = result.map((item) => ({
            ...item,
            isFavorite: false,
            isCart: false,
          }));
          setSaleItems(items);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {saleItems.length ? (
        <BasePage pageName="Sale" itemsArr={saleItems} />
      ) : (
        <Custom404 />
      )}
    </>
  );
}
