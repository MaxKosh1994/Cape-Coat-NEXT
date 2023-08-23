import React from 'react';
import { useSelector } from 'react-redux';
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

  const itemLink = useRouter().query.category;

  return (
    <div className={styles.Card} key={id}>
      <Link key={id} href={`${itemLink}/${id}`}>
        <span className={styles.CardMedia}>
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${photo}`}
            alt="Product Image"
            className={styles.Image}
          />
        </span>
        <h1 className={styles.NameCard}>{name}</h1>
      </Link>
      <div className={styles.CardContent}>
        <h3 className={styles.Price}>
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
    </div>
  );
};

export default ProductCard;
