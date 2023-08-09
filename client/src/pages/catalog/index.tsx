import React, { useEffect, useState } from 'react';
import CategoryList from '../../components/catalog/categoryList';
// import Category from '../Category/Category';
import styles from '../../styles/Catalog.module.css';

export default function Catalog() {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + 'catalog/categories',
          {
            credentials: 'include',
          }
        );
        if (response.status === 200) {
          const allCategs = await response.json();
          setAllCategories(allCategs);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className={styles.catalogueContainer}>
        {allCategories.map((cat) => (
          <CategoryList
            key={cat.id}
            id={cat.id}
            imageUrl={`${process.env.NEXT_PUBLIC_CATEGORY_URL}${cat.photo}`}
            linkText={cat.name}
            allCategory={allCategories}
          />
        ))}
      </div>
    </>
  );
}
