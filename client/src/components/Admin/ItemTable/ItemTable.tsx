import { useState, useEffect } from 'react';
import styles from './ItemTable.module.css';

import { Button } from '@mui/material';
import Image from 'next/image';

export default function ItemTable(props) {
  const handleUpdateItem = (id) => {
    props.handleOpenItem();
    props.setId((prev) => id);
  };

  console.log(props.content);
  return (
    <div className={styles.mainContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Артикул</th>
            <th>Фото</th>
            <th>Name</th>
            <th>Price</th>
            <th>In Stock</th>
            <th>Bestseller</th>
            <th>Изменение</th>
          </tr>
        </thead>
        <tbody>
          {props.content.map((item) => (
            <tr key={item.id}>
              <td
                style={{
                  backgroundColor: item.in_stock
                    ? 'rgba(158, 2, 2, 0.456)'
                    : 'inherit',
                }}
              >
                {item.id}
              </td>
              <td>{item.article}</td>
              <td>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.Photos[0].photo}`}
                  alt={item.name}
                  width={50}
                  height={75}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td
                style={{
                  backgroundColor: item.in_stock
                    ? 'rgba(158, 2, 2, 0.456)'
                    : 'inherit',
                }}
              >
                {item.in_stock ? 'Yes' : 'No'}
              </td>
              <td>{item.bestseller ? 'Yes' : 'No'}</td>
              <td>
                <button
                  className={styles.button}
                  onClick={() => handleUpdateItem(item.id)}
                  type='button'
                >
                  Изменить №{item.id}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
