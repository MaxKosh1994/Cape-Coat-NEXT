import React, { useState, useEffect } from 'react';
// import ProductCard from '../ProductCard/ProductCard';
import styles from '../../styles/Collection.module.css';
import { Typography, Pagination } from '@mui/material';
import { styled } from '@mui/system';

const CollectionContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '1rem',
});

export default function CollectionPage() {
  const [collectionItems, setCollectionItems] = useState([]);
  const [collectionName, setCollectionName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  // TODO как автоматизировать момент с выбором коллекции для главной?
  // TODO булевоe current в таблице коллекции и админ кликает да\нет?
  const idPlaceholder = 1;

  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC + `catalog/collection/${idPlaceholder}`
        );
        if (response.status === 200) {
          const collection = await response.json();
          setCollectionItems(collection);
          setCollectionName(collection[0].Collection.name);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const lastIndex = currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;

  const currentItems = collectionItems.slice(firstIndex, lastIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Typography className={styles.collectionText} variant="h3" align="center">
        <strong> {collectionName}</strong>
      </Typography>
      <div className={styles.collectionContainer}>
        {/* {currentItems.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            photo={item.Photos[0].photo}
            name={item.name}
            color={item.color}
            price={item.price}
            isFavorite={false}
            isCart={false}
            width={window.innerWidth < 830 ? '300px' : '400px'}
            height={window.innerWidth < 500 ? '415px' : '540px'}
          />
        ))} */}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '25px',
          marginBottom: '25px',
        }}
      >
        <Pagination
          sx={{ alignItems: 'center' }}
          count={Math.ceil(collectionItems.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          size="large"
          className="pagination"
        />
      </div>
    </>
  );
}
