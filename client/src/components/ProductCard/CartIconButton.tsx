import React from 'react';
import { IconButton } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface CartIconButtonProps {
  isCart: boolean;
  onClick: () => void;
}

const CartIconButton: React.FC<CartIconButtonProps> = ({ isCart, onClick }) => {
  return (
    <IconButton onClick={onClick} aria-label="Add to cart">
      {isCart ? (
        <AddTaskIcon style={{ color: 'rgb(0 0 0 / 70%)' }} />
      ) : (
        <AddShoppingCartIcon />
      )}
    </IconButton>
  );
};

export default CartIconButton;