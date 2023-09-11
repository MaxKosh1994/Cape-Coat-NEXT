import React, { useEffect, useState } from 'react';
import LikeButton from '../likeButton/LikeButton';

import {
  addCartItem,
  delCartItem,
  delItemInCart,
  getCartItems,
} from '@/app/cartSlice';
import { useAppDispatch } from '@/app/hooks';
import './CartButtonStyle.css';
import { Item } from '@/app/itemSlice';
import {
  getCartItemsByIdThunk,
  getCartItemsThunk,
} from '@/app/thunkActionsCart';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

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
  const [cartData, setCartData] = useState([]);
  const [isInCart, setIsInCart] = useState(false);

  const dispatch = useAppDispatch();
  const user = useSelector((state) => state.sessionSlice.user);

  const cartItems = useSelector(
    (state: RootState) => state.cartSlice.cartItems
  );

  useEffect(() => {
    if (user) {
      const isInCart = cartItems.some(
        (el) => el.id == itemId || el.item_id == itemId
      );
      setIsInCart(isInCart);
    } else {
      const cartFromStorage = JSON.parse(
        localStorage.getItem('cartItems') || '[]'
      );
      const isItemInCart = cartFromStorage.some(
        (element) => element.id === itemId
      );
      setIsInCart(isItemInCart);
    }
  }, [cartItems, user, itemId]);

  const cartHandler = async () => {
    try {
      if (!selectedMaterialId && !isInCart && !itemData.in_stock) {
        const materialAlertElement = document.getElementById('alert');

        if (materialAlertElement) {
          materialAlertElement.scrollIntoView({ behavior: 'smooth' });
        }

        setMaterialAlert('alert');
        setTimeout(() => {
          setMaterialAlert('');
        }, 1000);
        return;
      }
      if (!user) {
        const cartItemsFromStorage =
          JSON.parse(localStorage.getItem('cartItems')) || [];

        const materialName = selectedMaterialName
          ? selectedMaterialName
          : itemData.Material.name;

        const isItemInCart = cartItemsFromStorage.find(
          (item) => item.id === itemId
        );

        if (isItemInCart) {
          setIsInCart(isInCart);
        } else {
          const updatedCartItems = [
            ...cartItemsFromStorage,
            {
              id: itemId,
              material_name: materialName,
              in_stock: itemData.in_stock,
            },
          ];

          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
          setIsInCart(!isInCart);
          dispatch(getCartItemsByIdThunk(updatedCartItems));
          return;
        }
      } else {
        if (!isInCart) {
          //TODO нужно починить так, чтобы при sale тоже либо выбирался материал, либо selectedMaterialName обновлялся после товара не в кате гории sale
          const material = selectedMaterialName
            ? selectedMaterialName
            : itemData.Material.name;

          const materialName = { material_name: material };
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
            const data = await res.json();
            dispatch(addCartItem(data));
            setIsInCart(!isInCart);
          }
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
            <div className={`ui-ripple${isInCart ? ' in-cart-btn' : ''}`}>
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
