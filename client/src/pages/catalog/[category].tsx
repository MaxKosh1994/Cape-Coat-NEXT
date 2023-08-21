import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import { category, categoryClear } from '../../app/CategorySlice';
import { useRouter } from 'next/router';
import BasePage from '@/components/ItemPage/BasePage';

export default function Category() {
  const [catName, setCatName] = useState('');
  const location = useRouter().query.id;
  const dispatch = useDispatch();

  const card = useSelector(
    (state: RootState) => state.CategorySlice.categoryItems
  );

  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + `category/${location}`,
          {
            credentials: 'include',
          }
        );
        if (response.status === 200) {
          const result = await response.json();
          dispatch(categoryClear());

          result.forEach((el) => {
            el.Items.forEach((item) => {
              const photos = item.Photos; // Массив фотографий
              const firstPhoto = photos[0]?.photo || ''; // Получение первой фотографии или пустой строки, если фотография отсутствует

              dispatch(
                category({
                  id: item.id,
                  article: item.article,
                  photo: firstPhoto,
                  name: item.name,
                  price: item.price,
                  categoryName: item.categoryName,
                  isFavorite: false,
                  isCart: false,
                })
              );
            });
            setCatName(el.name);
          });
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, [location]);

  return (
    <>
      <BasePage pageName={catName} itemsArr={card} />
    </>
  );
}
