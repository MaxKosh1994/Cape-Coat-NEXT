import React from 'react';
import styles from './ItemTable.module.css';
import { Button } from '@mui/material';
import Image from 'next/image';

// TODO нужна типизация, any заглушка
export default function ItemTable(props: any) {
  // TODO проблема типизации
  const handleUpdateItem = (id, item) => {
    console.log('props', item);
    props.handleOpenItem(item);
    props.setId((prev) => id);
  };

  const namesForTable =
    props.content && props.content[0]
      ? Object.keys(props.content[0]).filter(
          (el) => el !== 'createdAt' && el !== 'updatedAt'
        )
      : [];

  return (
    <div className={styles.mainContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {namesForTable.map((name) => (
              <th key={name}>{name}</th>
            ))}
            <th>Отредактировать</th>
          </tr>
        </thead>
        <tbody>
          {/* // TODO проблема типизации
          */}
          {props.content.map((item) => (
            <tr key={item.id}>
              {namesForTable.map((name) => (
                <td key={name}>
                  {name === 'in_stock' ||
                  name === 'purchased' ||
                  name === 'bestseller' ? (
                    <input type="checkbox" checked={item[name]} disabled />
                  ) : name === 'Photos' &&
                    item.Photos &&
                    item.Photos.length > 0 ? (
                    <div className={styles.photoContainer}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.Photos[0].photo}`}
                        alt={item.name}
                        width={50}
                        height={75}
                      />
                    </div>
                  ) : (
                    item[name]
                  )}
                </td>
              ))}
              <td>
                <button
                  className={styles.button}
                  onClick={() => handleUpdateItem(item.id, item)}
                  type="button"
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
