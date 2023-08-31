import React, { useEffect, useState } from 'react';
import LikeButton from '../likeButton/LikeButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { addCartItem, delCartItem } from '@/app/cartSlice';
import { useAppDispatch } from '@/app/hooks';
import './CartButtonStyle.css';
import { Item } from '@/app/itemSlice';

interface IcartButtonProps {
  itemId: number;
  selectedMaterialId: number;
  selectedMaterialName: string;
  setMaterialAlert: React.Dispatch<React.SetStateAction<string>>;
  itemData: Item;
}

export default function CartButton({
  itemId,
  selectedMaterialId,
  selectedMaterialName,
  setMaterialAlert,
  itemData,
}: IcartButtonProps): JSX.Element {
  const [isInCart, setIsInCart] = useState(false);

  const cartData = useSelector((state: RootState) => state.cartSlice.cartItems);

  const user = useSelector((state: RootState) => state.sessionSlice.user);

  useEffect(() => {
    const isInCart = cartData.some((el) => el.item_id === itemId);
    setIsInCart(isInCart);
  }, [cartData, itemId]);
  const dispatch = useAppDispatch();
  const cartHandler = async () => {
    try {
      if (!selectedMaterialId && !isInCart && !itemData.in_stock) {
        setMaterialAlert('alert');
        setTimeout(() => {
          setMaterialAlert('');
        }, 1000);
        return;
      }
      if (!isInCart) {
        const materialName = { material: selectedMaterialName };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}cart/item/${itemId}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(materialName),
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
          `${process.env.NEXT_PUBLIC_URL}cart/item/${itemId}/${user}`,
          {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          }
        );
        if (res.ok) {
          setIsInCart(!isInCart);
          dispatch(delCartItem(itemId));
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
            <LikeButton itemId={itemId} />
          </div>
        </div>
      </div>
    </div>
  );
}
