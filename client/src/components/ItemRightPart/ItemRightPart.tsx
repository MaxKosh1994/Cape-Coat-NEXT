import React from 'react';
import styles from './ItemRightPartComp.module.css';

import { Box, List } from '@mui/material';
import CustomList from '../customList/CustomList';

import ItemMaterials from '../ItemMaterials/ItemMaterials';
import { Item } from '@/app/itemSlice';
import { ImaterialsData } from '@/pages/catalog/[category]/[item]';
import numeral from 'numeral';

interface ItemRightPartProps {
  itemData: Item;
  itemId: number;
  materialsData: ImaterialsData[];
}

export default function ItemRightPart({
  itemData,
  itemId,
  materialsData,
}: ItemRightPartProps): JSX.Element {
  return (
    <div
      className={`${styles.grid__item} ${styles.large_one_third}`}
      id={styles.productInfoProduct}
    >
      <div className={styles.text_left}>
        <p id="alert" className={styles.text_center}>
          Cape & Coat
        </p>
        <div className={styles.itemNameDiv}>
          {' '}
          <h1 className={styles.itemName}>{itemData.name}</h1>
          <span className={styles.itemArt}>Art.{itemData.article}</span>
        </div>
        {itemData.in_stock ? (
          <>
            <div className={styles.price_old}>
              {`${numeral(itemData.price).format('0,0')} РУБ.`}
            </div>
            <div className={styles.price_current}>
              {`${numeral(itemData.new_price).format('0,0')} РУБ.`}
            </div>
            <div className={styles.discount}>
              {`Скидка ${Math.round(
                ((itemData.price - itemData.new_price) * 100) / itemData.price
              )} %`}
            </div>
          </>
        ) : (
          <div className={styles.price_current}>
            {`${numeral(itemData.price).format('0,0')} РУБ.`}
          </div>
        )}
        <ItemMaterials
          itemId={itemId}
          itemData={itemData}
          materialsData={materialsData}
        />
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
