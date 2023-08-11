import React from 'react';
import { Box, Modal } from '@mui/material';
import { IItem } from '../orders/types';
import styles from './Modal.module.css';
// import ProductCard from '../../ProductCard/ProductCard';

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
      <Box className={styles.box}>
        <p>Здесь все будет</p>
      </Box>
      {/* <Box className={styles.box}>
        {itemsInOrder?.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            photo={item.Photos[0].photo}
            name={item.name}
            isFavorite={true}
            isCart={false}
            color={item.color}
            price={item.price}
            width='400px'
            height='540px'
          />
        ))}
      </Box> */}
    </Modal>
  );
}
