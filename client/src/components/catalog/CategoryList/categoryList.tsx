import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/Catalog.module.css';
// import Category from '../Category/Category';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Category from '../../../pages/catalog/[category]';
import { ICategoryList } from '@/TypeScript/categoryList.type';

export default function CategoryList({
  id,
  imageUrl,
  category,
  urlName,
}: ICategoryList) {
  const router = useRouter();
  const [englishName, setEnglishName] = useState('');

  //TODO подумать над query, чтобы не отображалось в адресной строке
  const categoryHandler = async (e) => {
    const target = e.target;
    if (!target) return;
    const pathname = `/catalog/${urlName}`;
    router.push(
      {
        pathname,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="oneCategory" id={id}>
      <div className={styles.categoryContainer} onClick={categoryHandler}>
        <Image
          src={imageUrl}
          className={styles.image}
          width={400}
          height={600}
          alt={category}
        />
        <p className={styles.categoryName}>{category}</p>
      </div>
    </div>
  );
}
