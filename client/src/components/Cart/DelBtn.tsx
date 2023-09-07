import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import styles from '../../styles/Checkout.module.css';

export default function DelBtn({ itemId, handleDeleteItemFromCart }) {
  return (
    <button
      className={styles.basketItemDeleteButton}
      type="button"
      onClick={() => handleDeleteItemFromCart(itemId)}
    >
      <DeleteOutlineIcon sx={{ fontSize: '2rem', color: '#656565' }} />
    </button>
  );
}
