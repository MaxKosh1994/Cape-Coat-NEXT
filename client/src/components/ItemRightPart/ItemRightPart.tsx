import React, { useEffect, useState } from 'react';
import styles from './ItemRightPartComp.module.css';

import { Box, List } from '@mui/material';
import CustomList from '../customList/CustomList';
import CartButton from '../CartButton/CartButton';
import ItemMaterials from '../ItemMaterials/ItemMaterials';

export default function ItemRightPart({ itemData, item }) {
  return (
    <div
      className={`${styles.grid__item} ${styles.large_one_third}`}
      id={styles.productInfoProduct}
    >
      <div className={styles.text_left}>
        <p className={styles.text_center}>Cape & Coat</p>
        <div className={styles.itemNameDiv}>
          {' '}
          <h1 className={styles.itemName}>{itemData.name}</h1>
          <span className={styles.itemArt}>Art.{itemData.article}</span>
        </div>
        {itemData.in_stock ? (
          <div className={styles.prices}>
            <div className={styles.price_old}>{`${itemData.price
              .toLocaleString()
              .replace(/,\s?/g, ' ')} РУБ.`}</div>
            <div className={styles.price_current}>
              {`${itemData.new_price
                .toLocaleString()
                .replace(/,\s?/g, ' ')} РУБ.`}
            </div>
            <div className={styles.discount}>
              {' '}
              {`Скидка ${Math.round(
                ((itemData.price - itemData.new_price) * 100) / itemData.price
              )} %`}
            </div>
          </div>
        ) : (
          <div className={styles.price_current}>{`${itemData.price
            .toLocaleString()
            .replace(/,\s?/g, ' ')} РУБ.`}</div>
        )}
        <ItemMaterials item={item} />
      </div>

      <Box
        sx={{
          class: 'list-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'end',
          alignItems: 'start',
          marginBottom: '50px',
        }}
      >
        <List sx={{ width: '100%' }}>
          <CustomList name="Описание" data={itemData.description} />
          <CustomList name="Характеристики" data={itemData.characteristics} />

          <CustomList
            name="Параметры модели на фото"
            data={itemData.model_params}
          />
        </List>
        {itemData.in_stock && (
          <span>Товары в категории SALE не отшиваются на заказ</span>
        )}
      </Box>
    </div>
  );
}
