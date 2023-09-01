import { useState, useEffect } from 'react';
import styles from './ItemTable.module.css';

import { Button } from '@mui/material';

export default function ItemTable(props) {
  const handleUpdateItem = (id) => {
    props.handleOpenItem();
    props.setId((prev) => id);
  };
  return (
    <div className={styles.mainContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
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
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.in_stock ? 'Yes' : 'No'}</td>
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
