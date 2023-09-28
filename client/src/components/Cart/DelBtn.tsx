import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import styles from '../../styles/Checkout.module.css';
import { useCartControl } from './useCartControl';

export default function DelBtn({ itemId }: { itemId: number }) {
  const { handleDeleteItemFromCart } = useCartControl();

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
