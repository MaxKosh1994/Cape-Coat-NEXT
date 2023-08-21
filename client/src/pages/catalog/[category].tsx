import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import { ICategory, category, categoryClear } from '../../app/CategorySlice';
import { useRouter } from 'next/router';
import BasePage from '@/components/ItemPage/BasePage';
import Custom404 from '../404';

export default function Category() {
  const [catName, setCatName] = useState('');
  const nameOneCategory = useRouter().query.category;
  const dispatch = useDispatch();

  const card = useSelector(
    (state: RootState) => state.CategorySlice.categoryItems
  );

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
          dispatch(categoryClear());

          result.items.forEach((item: ICategory) => {
            dispatch(
              category({
                id: item.id,
                article: item.article,
                photo: item.Photos[0]?.photo || '',
                name: item.name,
                price: item.price,
                categoryName: item.categoryName,
                isFavorite: false,
                isCart: false,
              })
            );
          });
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
      {card.length ? (
        <BasePage pageName={catName} itemsArr={card} />
      ) : (
        <Custom404 />
      )}
    </>
  );
}
