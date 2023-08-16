import React from 'react';
import { Box, Modal } from '@mui/material';
import { IItem } from '../orders/types';
import styles from './Modal.module.css';
import ProductCard from '@/components/ProductCard/ProductCard';
import SearchItemCard from '@/components/SearchItemCard/SearchItemCard';

export default function ModalItemsInOrder({
  open,
  setOpen,
  itemsInOrder,
}: IModalItemsInOrderProps) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className={styles.box}>
        {itemsInOrder?.map((item: IItem) => (
          <SearchItemCard key={item.id} item={item} />
        ))}
      </div>
    </Modal>
  );
}
