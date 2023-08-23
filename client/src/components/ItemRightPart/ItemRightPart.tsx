import React, { useEffect, useState } from 'react';
import './itemRightPartComp.css';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

import { addCartItem, delCartItem } from '@/app/cartSlice';
import LikeButton from '../likeButton/LikeButton';

export default function ItemRightPart({ itemData, item }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const user = useSelector((state: RootState) => state.sessionSlice.user);
  const cartData = useSelector((state: RootState) => state.cartSlice.cartItems);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const isInCart = cartData.some((el) => el.item_id === +item);
    setIsInCart(isInCart);
  }, [cartData, item]);

  const cartHandler = async () => {
    try {
      if (!isInCart) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}cart/item/${item}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          }
        );

        if (res.ok) {
          setIsInCart(true);
          const data = await res.json();
          const addToCart = data.newCartItem;

          dispatch(addCartItem(addToCart));
        }
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}cart/item/${item}/${user}`,
          {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          }
        );
        if (res.ok) {
          setIsInCart(!isInCart);
          dispatch(delCartItem(item));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product__content false">
      <div className="inner-wrapper-sticky">
        <div className="product__content-inner">
          <h1 className="product__title">
            {itemData.name}
            <span>{itemData.article}</span>
          </h1>
          <div className="product__price">
            <div className="product__price-old">{itemData.price}</div>
            <div className="product__price-current">{itemData.new_price}</div>
            <div className="product__price-discount">100%</div>
          </div>
          <div className="product__actions">
            <div className="product__actions-line">
              <div className="product__actions-button">
                <button
                  onClick={cartHandler}
                  type="button"
                  className={`ui-button ui-button-wide ui-button-dark${
                    isInCart ? ' in-cart' : ''
                  }`}
                >
                  <div className="ui-ripple">
                    <div
                      className={`ui-button-content${
                        isInCart ? ' in-cart' : ''
                      }`}
                    >
                      {isInCart ? 'В корзине' : 'В корзину'}
                    </div>
                  </div>
                </button>
              </div>
              <div className="product__actions-additional">
                <div className="product__favorites">
                  <LikeButton item={item} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
