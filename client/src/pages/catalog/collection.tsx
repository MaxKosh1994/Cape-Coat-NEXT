import React, { useState } from 'react';
import { Pagination } from '@mui/material';
import { styled } from '@mui/system';
import BasePage from '@/components/ItemPage/BasePage';
import { IBasePageItem } from '@/TypeScript/basePageTypes';

const CollectionContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '1rem',
});

interface CollectionItem {
  id: number;
  name: string;
  article: string;
  description: string;
  model_params: string;
  characteristics: string;
  price: number;
  new_price: number;
  in_stock: boolean;
  purchased: boolean;
  bestseller: boolean;
  collection_id: number;
  material_id: number;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  Collection: {
    id: number;
    name: string;
    photo: string;
    description: string;
    urlName: string;
    current: boolean;
    createdAt: string;
    updatedAt: string;
  };
  Material: {
    id: number;
    name: string;
    photo: string;
    category_id: number;
    createdAt: string;
    updatedAt: string;
  };
  Photos: string[];
}

interface CollectionPageProps {
  collectionItems: IBasePageItem[];
  collectionName: string;
}

function CollectionPage({
  collectionItems,
  collectionName,
}: CollectionPageProps) {
  const itemsPerPage = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = collectionItems.slice(firstIndex, lastIndex);

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

export async function getServerSideProps() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + 'catalog/collection'
    );
    if (response.status === 200) {
      const collection: CollectionItem[] = await response.json();
      console.log('collection', collection);
      const collectionName = collection[0]?.Collection.name || '';
      return {
        props: {
          collectionItems: collection,
          collectionName,
        },
      };
    } else {
      return {
        props: {
          collectionItems: [],
          collectionName: '',
        },
      };
    }
  } catch (err) {
    console.error(err);
    return {
      props: {
        collectionItems: [],
        collectionName: '',
      },
    };
  }
}

export default CollectionPage;
