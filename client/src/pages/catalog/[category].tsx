import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import BasePage from '@/components/ItemPage/BasePage';
import Custom404 from '../404';

export default function Category() {
  const [catName, setCatName] = useState('');
  const [items, setItems] = useState('');
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
          setCatName(result.catName);
          setItems(result.items);
        } else if (response.status === 404) {
          const result = await response.json();
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, [nameOneCategory]);

  return (
    <>
      {items.length ? (
        <BasePage pageName={catName} itemsArr={items} />
      ) : (
        <Custom404 />
      )}
    </>
  );
}
