import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import styles from './ProductCard.module.css';

interface CartIconButtonProps {
  isCart: boolean;
  onClick: () => void;
  itemId: number;
}

const CartIconButton: React.FC<CartIconButtonProps> = ({
  isCart,
  onClick,
  itemId,
}) => {
  // const [isItemInCart, setIsItemInCart] = useState(false);
  // useEffect(() => {
  //   const localStorageData = localStorage.getItem('cartItems');
  //   const itemsInCart = JSON.parse(localStorageData || '[]');
  //   setIsItemInCart(itemsInCart.includes(itemId));
  // }, []);



  const localStorageData = localStorage.getItem('cartItems');

  const itemsInCart = JSON.parse(localStorageData || '[]');

  const isItemInCart = itemsInCart.includes(itemId);


  return (
    <IconButton
      className={styles.IconImage}
      onClick={onClick}
      aria-label="Add to cart"
    >
      {isCart || isItemInCart ? (
        <AddTaskIcon
          className={styles.IconImage}
          style={{ color: 'rgb(0 0 0 / 70%)' }}
        />
      ) : (
        <AddShoppingCartIcon className={styles.IconImage} />
      )}
    </IconButton>
  );
};

export default CartIconButton;
