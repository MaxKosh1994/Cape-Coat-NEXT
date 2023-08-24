import React, { useEffect, useState } from 'react';
import styles from './ItemRightPartComp.module.css';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

import { addCartItem, delCartItem } from '@/app/cartSlice';
import LikeButton from '../likeButton/LikeButton';
import { Box, List } from '@mui/material';
import CustomList from '../customList/CustomList';
import CartButton from '../CartButton/CartButton';
import ItemMaterials from '../ItemMaterials/ItemMaterials';

export default function ItemRightPart({ itemData, item }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const user = useSelector((state: RootState) => state.sessionSlice.user);
  const cartData = useSelector((state: RootState) => state.cartSlice.cartItems);
  // const materialsData = useSelector(
  //   (state: RootState) => state.itemSlice.materials
  // );
  const dispatch = useAppDispatch();
  const materialsUrl = process.env.NEXT_PUBLIC_MATERIALS_URL;

  // const textileData = materialsData?.map((material) => ({
  //   id: material.id,
  //   url: `${materialsUrl}${material.photo}`,
  // }));

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
        <CartButton item={item} />
      </div>
      <ItemMaterials />
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
        <List>
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
// <div className="product__content false">
//   <div className="inner-wrapper-sticky">
//     <div className="product__content-inner">
//       <h1 className="product__title">
//         {itemData.name}
//         <span>Art.{itemData.article}</span>
//       </h1>
//       <div className="product__price">
//         {itemData.in_stock ? (
//           <>
//             <div className="product__price-old">{`${itemData.price
//               .toLocaleString()
//               .replace(/,\s?/g, ' ')} РУБ.`}</div>
//             <div className="product__price-current">
//               {`${itemData.new_price
//                 .toLocaleString()
//                 .replace(/,\s?/g, ' ')} РУБ.`}
//             </div>
//             <div className="product__price-discount">
//               {' '}
//               Скидка
//               {Math.round(
//                 ((itemData.price - itemData.new_price) * 100) /
//                   itemData.price
//               )}
//               %
//             </div>
//           </>
//         ) : (
//           <div className="product__price-current">{`${itemData.price
//             .toLocaleString()
//             .replace(/,\s?/g, ' ')} РУБ.`}</div>
//         )}
//       </div>
//       <div className="product__actions">
//         <div className="product__actions-line">
//           <div className="product__actions-button">
//             <button
//               onClick={cartHandler}
//               type="button"
//               className={`ui-button ui-button-wide ui-button-dark${
//                 isInCart ? ' in-cart' : ''
//               }`}
//             >
//               <div className="ui-ripple">
//                 <div
//                   className={`ui-button-content${
//                     isInCart ? ' in-cart' : ''
//                   }`}
//                 >
//                   {isInCart ? 'В корзине' : 'В корзину'}
//                 </div>
//               </div>
//             </button>
//           </div>
//           <div className="product__actions-additional">
//             <div className="product__favorites">
//               <LikeButton item={item} />
//             </div>
//           </div>
//         </div>
//       </div>

//       <Box
//         sx={{
//           class: 'list-box',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'end',
//           alignItems: 'flex-end',
//           marginBottom: '50px',
//         }}
//       >
//         <List>
//           <CustomList name="Описание" data={itemData.description} />
//           <CustomList
//             name="Характеристики"
//             data={itemData.characteristics}
//           />
//           <CustomList name="Размеры" data={itemData.model_sizes} />
//           <CustomList
//             name="Указания по уходу"
//             data={itemData.care_instructions}
//           />
//         </List>
//       </Box>
//     </div>
//   </div>
// </div>
