import React from 'react';
import styles from './SearchContainer.module.css';
import { ISearchContainerProps } from './types';
import SearchItemCard from '../SearchItemCard/SearchItemCard';

export default function SearchContainer({
  filteredItems,
}: ISearchContainerProps) {
  return (
    <>
      {filteredItems.length > 0 ? (
        <div className={styles.resultContainer}>
          {filteredItems.map((item) => (
            <SearchItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className={styles.resultContainer}>
          <h5>Товар не найден</h5>
        </div>
      )}
    </>
  );
}
