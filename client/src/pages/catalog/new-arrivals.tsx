import React, { useState, useEffect } from 'react';
import BasePage from '@/components/ItemPage/BasePage';
import { IBasePageItem } from '@/TypeScript/basePageTypes';

export default function NewArrivalsPage() {
  const [newArrivalsItems, setNewArrivalsItems] = useState([]);
  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + 'catalog/new-arrivals'
        );
        if (response.status === 200) {
          const result = await response.json();
          const collection = result.map((el: IBasePageItem) => ({
            ...el,
            isFavorite: false,
            isCart: false,
          }));
          setNewArrivalsItems(collection);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return <BasePage pageName="Новые поступления" itemsArr={newArrivalsItems} />;
}
