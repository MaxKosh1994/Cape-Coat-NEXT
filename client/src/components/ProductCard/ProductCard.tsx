import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ProductCard.module.css';
import { IProductCard } from '@/TypeScript/ProductCard.type';
import useProductCardLogic from './useProductCardLogic';
import FavoriteIconButton from './FavoriteIconButton';
import CartIconButton from './CartIconButton';

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

  const itemCardHandler = async (e): Promise<void> => {
    const target = e.target;
    if (!target) return;
    const parent = target.closest('.conteiner-item').id;
  };

  return (
    <div className={styles.Card} key={id}>
      <span className={styles.CardMedia}>
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${photo}`}
          alt="Product Image"
          onClick={itemCardHandler}
          className={styles.Image}
        />
      </span>
      <h1 className={styles.NameCard}>{name}</h1>
      <div className={styles.CardContent}>
        <h3 className={styles.Price}>
          Цена: {price?.toLocaleString().replace(/,\s?/g, ' ')} ₽
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
