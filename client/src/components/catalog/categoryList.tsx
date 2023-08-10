import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Catalog.module.css';
// import Category from '../Category/Category';
import axios from 'axios';
import Image from 'next/image';

export default function CategoryList({ id, imageUrl, category, allCategory }) {
  const router = useRouter();
  const [englishName, setEnglishName] = useState('');

  useEffect(() => {
    const translateToEnglish = async () => {
      try {
        const response = await axios.get(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            category
          )}&langpair=ru|en`
        );

        if (
          response.data.responseData &&
          response.data.responseData.translatedText
        ) {
          setEnglishName(response.data.responseData.translatedText);
        } else {
          setEnglishName('');
        }
      } catch (error) {
        console.error('Translation error:', error);
        setEnglishName('');
      }
    };

    translateToEnglish();
  }, [category]);

  const categoryHandler = (e) => {
    const target = e.target;
    if (!target) return; // Проверка наличия целевого элемента
    const parent = target.closest('.category-container').id;
    router.push(`/catalog/${englishName}`, { state: parent });
  };

  return (
    <div className={styles.categoryContainer} onClick={categoryHandler} id={id}>
      <Image
        src={imageUrl}
        className={styles.image}
        width={400}
        height={600}
        alt={category}
      />
      <p className={styles.categoryName}>{category}</p>
    </div>
  );
}
