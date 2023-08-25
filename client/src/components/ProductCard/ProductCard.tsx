import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductCard.module.css';
import { IProductCard } from '@/TypeScript/ProductCard.type';
import useProductCardLogic from './useProductCardLogic';
import FavoriteIconButton from './FavoriteIconButton';
import CartIconButton from './CartIconButton';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import { ICategory } from '@/app/CategorySlice';
import { IItem, itemInCategory } from '../../app/CategorySlice';

const ProductCard: React.FC<IProductCard> = ({
  id,
  // article,
  // photo,
  // name,
  // price,
  isFavorite: initialIsFavorite,
  isCart: initialIsCart,
}: // newPrice,
IProductCard) => {
  const { isFavorite, isCart, favoriteHandler, cartHandler } =
    useProductCardLogic(
      id,
      // article,
      // photo,
      // name,
      // price,
      initialIsFavorite,
      initialIsCart
      // newPrice
    );

  const dispatch = useDispatch();

  const itemLink = useRouter().query.category;

  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + `item/${id}`,
          {
            credentials: 'include',
          }
        );
        if (response.status === 200) {
          const result = await response.json();
          // console.log(result.item.Photos[0]?.photo )

          dispatch(
            itemInCategory({
              id: result.item.id,
              article: result.item.article,
              photo: result.item.Photos[0]?.photo || '',
              name: result.item.name,
              price: result.item.price,
              categoryName: result.item.categoryName,
              isFavorite: false,
              isCart: false,
            })
          );
          // });
          // console.log(itemInCategory)
        } else if (response.status === 404) {
          const result = await response.json();
          console.log(result.message);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className={styles.Card} key={id}>
      <Link key={id} href={`${itemLink}/${id}`}>
        <span className={styles.CardMedia}>
          {/* <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${photo}`}
            alt="Product Image"
            className={styles.Image}
          /> */}
        </span>
        <h1 className={styles.NameCard}>{name}</h1>
      </Link>
      <div className={styles.CardContent}>
        <h3 className={styles.Price}>
          {/* Цена: {price?.toLocaleString().replace(/,\s?/g, ' ')} ₽ */}
        </h3>

        <div className={styles.Icons}>
          <FavoriteIconButton
            itemId={id}
            isFavorite={isFavorite}
            onClick={favoriteHandler}
          />
          <CartIconButton isCart={isCart} onClick={cartHandler} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
