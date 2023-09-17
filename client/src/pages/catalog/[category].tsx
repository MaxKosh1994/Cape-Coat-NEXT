import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BasePage from '@/components/ItemPage/BasePage';
import Custom404 from '../404';
import { IBasePageItem } from '@/TypeScript/basePageTypes';

export default function Category() {
  const [catName, setCatName] = useState('');
  const [categoryItems, setCategoryItems] = useState([]);

  const nameOneCategory = useRouter().query.category;

  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + `category/${nameOneCategory}`,
          {
            credentials: 'include',
          }
        );
        if (response.status === 200) {
          const result = await response.json();
          const items = result.items.map((item: IBasePageItem) => ({
            ...item,
            isFavorite: false,
            isCart: false,
          }));

          setCategoryItems(items);
          setCatName(result.catName);
        } else if (response.status === 404) {
          const result = await response.json();
          console.log(result.message);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, [nameOneCategory]);

  return (
    <>
      {categoryItems.length ? (
        <BasePage pageName={catName} itemsArr={categoryItems} />
      ) : (
        <Custom404 />
      )}
    </>
  );
}
