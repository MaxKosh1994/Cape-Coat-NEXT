import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/Catalog.module.css';
import Image from 'next/image';
import { ICategoryList } from '@/TypeScript/categoryList.type';

export default function CategoryList({
  id,
  imageUrl,
  category,
  urlName,
}: ICategoryList) {
  const router = useRouter();

  const categoryHandler = async (e: { target: any }) => {
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
    <div className="oneCategory" id={id.toString()}>
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
