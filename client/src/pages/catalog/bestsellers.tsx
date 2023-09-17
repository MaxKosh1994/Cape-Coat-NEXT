import { useState, useEffect } from 'react';
import BasePage from '@/components/ItemPage/BasePage';
import Custom404 from '../404';
import { IBasePageItem } from '@/TypeScript/basePageTypes';

export default function BestsellersPage() {
  const [bestsellerItems, setBestsellerItems] = useState([]);
  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + 'catalog/bestsellers'
        );
        if (response.status === 200) {
          const result = await response.json();
          const items = result.map((item: IBasePageItem) => ({
            ...item,
            isFavorite: false,
            isCart: false,
          }));
          setBestsellerItems(items);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {bestsellerItems.length ? (
        <BasePage pageName="Bestsellers" itemsArr={bestsellerItems} />
      ) : (
        <Custom404 />
      )}
    </>
  );
}
