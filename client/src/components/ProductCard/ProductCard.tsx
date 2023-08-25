import React from 'react';
import styles from './ProductCard.module.css';
import { IProductCard } from '@/TypeScript/ProductCard.type';
import useProductCardLogic from './useProductCardLogic';
import FavoriteIconButton from './FavoriteIconButton';
import CartIconButton from './CartIconButton';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ProductCard: React.FC<IProductCard> = ({
  id,
  article,
  photo,
  name,
  price,
  isFavorite: initialIsFavorite,
  isCart: initialIsCart,
  newPrice,
}: IProductCard) => {
  const { isFavorite, isCart, favoriteHandler, cartHandler } =
    useProductCardLogic(
      id,
      article,
      photo,
      name,
      price,
      initialIsFavorite,
      initialIsCart,
      newPrice
    );

  const router = useRouter();
  const { category } = router.query;
  return (
    <div className={styles.Card} key={id}>
      <Link href={`/${category}/${id}`} as={`/catalog/${category}/${id}`}>
        <span className={styles.CardMedia}>
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${photo}`}
            alt="Product Image"
            className={styles.Image}
          />
        </span>
        <h1 className={styles.NameCard}>{name}</h1>
      </Link>
      {newPrice ? (
        <div className={styles.CardContent}>
          <h3 className={styles.Price}>
            Цена:
          </h3>
            <h3 className={styles.OldPrice}>{price?.toLocaleString().replace(/,\s?/g, ' ')} ₽</h3>
          <h3 className={styles.NewPrice}>
            {newPrice?.toLocaleString().replace(/,\s?/g, ' ')} ₽
          </h3>
          <div className={styles.Icons}>
            <FavoriteIconButton
              isFavorite={isFavorite}
              onClick={favoriteHandler}
            />
            <CartIconButton isCart={isCart} onClick={cartHandler} />
          </div>
        </div>
      ) : (
        <div className={styles.CardContent}>
          <h3 className={styles.PriceOne}>
            Цена: {price?.toLocaleString().replace(/,\s?/g, ' ')} ₽
          </h3>
          <div className={styles.Icons}>
            <FavoriteIconButton
              isFavorite={isFavorite}
              onClick={favoriteHandler}
            />
            <CartIconButton isCart={isCart} onClick={cartHandler} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
