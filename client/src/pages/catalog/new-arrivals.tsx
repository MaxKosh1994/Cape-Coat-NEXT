import React, { useState, useEffect } from 'react';
// import ProductCard from '../ProductCard/ProductCard';
import styles from '../../styles/NewArrivals.module.css';
import { Typography } from '@mui/material';
import Head from 'next/head';
import ProductCard from '@/components/ProductCard/ProductCard';
import BasePage from '@/components/ItemPage/BasePage';

export default function NewArrivalsPage() {
  const [newArrivalsItems, setNewArrivalsItems] = useState([]);
  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + 'catalog/new-arrivals'
        );
        if (response.status === 200) {
          const collection = await response.json();
          setNewArrivalsItems(collection);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return <BasePage pageName="Новые поступления" itemsArr={newArrivalsItems} />;
}
