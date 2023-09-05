import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import { styled } from '@mui/system';
import BasePage from '@/components/ItemPage/BasePage';

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

  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + `catalog/collection`
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
      <BasePage pageName={collectionName} itemsArr={currentItems} />
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
