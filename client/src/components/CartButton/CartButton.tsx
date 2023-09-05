import React, { useEffect, useState } from 'react';
import LikeButton from '../likeButton/LikeButton';

import { addCartItem, delCartItem } from '@/app/cartSlice';
import { useAppDispatch } from '@/app/hooks';
import './CartButtonStyle.css';
import { Item } from '@/app/itemSlice';
import { getCartItemsThunk } from '@/app/thunkActionsCart';
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

  const cartItems = useSelector(
    (state: RootState) => state.cartSlice.cartItems
  );
  useEffect(() => {
    const isInCart = cartItems.some(
      (el) => el.id == itemId || el.item_id == itemId
    );

    setIsInCart(isInCart);
  }, [cartItems, itemId]);

  const cartHandler = async () => {
    // //!------ЕСЛИ ЮЗЕРА НЕТ - ЛОГИКА ДОБАВЛЕНИЯ В ЛОКАЛ------

    // if (!user) {
    //   const cartItemsFromStorage =
    //     JSON.parse(localStorage.getItem('cartItems')) || [];

    //   const materialName = selectedMaterialName
    //     ? selectedMaterialName
    //     : itemData.Material.name;

    //   const isItemInCart = cartItemsFromStorage.find(
    //     (item) => item.id === itemId
    //   );

    //   if (isItemInCart) {
    //     const updatedCartItems = cartItemsFromStorage.map((item) =>
    //       item.id === itemId ? { ...item, material: materialName } : item
    //     );
    //     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    //   } else {
    //     const updatedCartItems = [
    //       ...cartItemsFromStorage,
    //       { id: itemId, material: materialName },
    //     ];

    //     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    //   }
    //   return;
    // }

    // //! -----------------------------------------------------

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
          const addToCart = data.filter((el) => el.id == itemId)[0];

          // console.log('addToCart, addToCart', addToCart)

          dispatch(addCartItem(addToCart));
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
