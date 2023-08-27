import React from 'react';
import { IconButton } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import styles from './ProductCard.module.css';

interface CartIconButtonProps {
  isCart: boolean;
  onClick: () => void;
}

const CartIconButton: React.FC<CartIconButtonProps> = ({ isCart, onClick }) => {
  return (
    <IconButton
      className={styles.IconImage}
      onClick={onClick}
      aria-label="Add to cart"
    >
      {isCart ? (
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
