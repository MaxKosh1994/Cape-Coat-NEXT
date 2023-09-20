import React, { useEffect, useState } from 'react';
import LikeButton from '../likeButton/LikeButton';
import {
  addCartItem,
  delCartItem,
  delItemInCart,
  getCartItems,
} from '@/app/cartSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import './CartButtonStyle.css';
import { Item } from '@/app/itemSlice';
import {
  getCartItemsByIdThunk,
  getCartItemsThunk,
} from '@/app/thunkActionsCart';
import { RootState } from '@/app/store';

interface ICartButtonProps {
  itemId: number;
  selectedMaterialId: number;
  selectedMaterialName: string;
  setMaterialAlert: React.Dispatch<React.SetStateAction<string>>;
  itemData: Item;
}

interface CartItem {
  id: number;
  material_name: string;
  in_stock: boolean;
}

export default function CartButton({
  itemId,
  selectedMaterialId,
  selectedMaterialName,
  setMaterialAlert,
  itemData,
}: ICartButtonProps): JSX.Element {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [isInCart, setIsInCart] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.sessionSlice.user);

  const cartItems = useAppSelector(
    (state: RootState) => state.cartSlice.cartItems
  );

  useEffect(() => {
    if (user) {
      const isInCart = cartItems.some((el) => el.id === itemId);
      setIsInCart(isInCart);
    } else {
      const cartFromStorage: CartItem[] = JSON.parse(
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
        const cartItemsFromStorage: CartItem[] =
          JSON.parse(localStorage.getItem('cartItems')!) || [];

        const materialName = selectedMaterialName
          ? selectedMaterialName
          : itemData.Material.name;

        const isItemInCart = cartItemsFromStorage.some(
          (item) => item.id === itemId
        );

        if (isItemInCart) {
          setIsInCart(isItemInCart);
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
          setIsInCart(true);
          await dispatch(getCartItemsByIdThunk(updatedCartItems));
          return;
        }
      } else {
        if (!isInCart) {
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
            await dispatch(getCartItemsThunk());
            setIsInCart(true);
          }
        }
      }
    } catch (error) {
      console.error(error);
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
