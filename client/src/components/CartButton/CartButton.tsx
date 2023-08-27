import React, { useEffect, useState } from 'react';
import LikeButton from '../likeButton/LikeButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { addCartItem, delCartItem } from '@/app/cartSlice';
import { useAppDispatch } from '@/app/hooks';
import './CartButtonStyle.css';

export default function CartButton({
  item,
  selectedMaterialId,
  setMaterialAlert,
}) {
  const [isInCart, setIsInCart] = useState(false);

  const cartData = useSelector((state: RootState) => state.cartSlice.cartItems);
  const user = useSelector((state: RootState) => state.sessionSlice.user);

  useEffect(() => {
    const isInCart = cartData.some((el) => el.item_id === +item);
    setIsInCart(isInCart);
  }, [cartData, item]);

  const dispatch = useAppDispatch();
  const cartHandler = async () => {
    try {
      if (!selectedMaterialId && !isInCart) {
        setMaterialAlert('alert');
        setTimeout(() => {
          setMaterialAlert('');
        }, 1000);
        return;
      }
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
              <div className={`ui-button-content${isInCart ? ' in-cart' : ''}`}>
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
  );
}
