import Image from 'next/image';
import React from 'react';
import { ISearchCardItem } from './types';
import styles from './SearchItemCard.module.css';

export default function SearchItemCard({ item }: ISearchCardItem) {
  return (
    <div className={styles.container} key={item.id}>
      <div className={styles.imageContainer}>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.Photos[0].photo}`}
          alt={item.name}
          width={50}
          height={75}
        />
      </div>
      <div className={styles.textContainer}>
        <h5>{item.name}</h5>
        <h6>
          {item.in_stock ? (
            <>
              <span className={styles.oldPrice}>
                {item.price.toLocaleString().replace(/,\s?/g, ' ')} ₽
              </span>
              <span style={{ color: 'red', marginLeft: '5px' }}>
                {item.new_price.toLocaleString().replace(/,\s?/g, ' ')} ₽
              </span>
            </>
          ) : (
            `${item.price.toLocaleString().replace(/,\s?/g, ' ')} ₽`
          )}
        </h6>
        <h6>{`Артикул: ${item.article}`}</h6>
      </div>
    </div>
  );
}
