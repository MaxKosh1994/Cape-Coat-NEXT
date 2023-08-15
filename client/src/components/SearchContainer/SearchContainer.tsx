import React, { useEffect, useState, useRef } from 'react';
import styles from './SearchContainer.module.css';
import { ISearchContainerProps } from './types';
import SearchItemCard from '../SearchItemCard/SearchItemCard';

export default function SearchContainer({
  filteredItems,
}: ISearchContainerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {filteredItems.length > 0
        ? isVisible && (
            <div className={styles.resultContainer} ref={containerRef}>
              {filteredItems.map((item) => (
                <SearchItemCard key={item.id} item={item} />
              ))}
            </div>
          )
        : isVisible && (
            <div className={styles.resultContainer} ref={containerRef}>
              <h5>Товар не найден</h5>
            </div>
          )}
    </>
  );
}
