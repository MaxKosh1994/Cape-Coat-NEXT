import React, { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/Catalog.module.css';
import Image from 'next/image';
import { ICategory } from '@/TypeScript/categoryList.type';

export default function CategoryList({
  categoryInfo,
}: {
  categoryInfo: ICategory;
}) {
  const router = useRouter();

  const categoryHandler = async (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target;
    if (!target) return;
    const pathname = `/catalog/${categoryInfo.urlName}`;
    router.push(
      {
        pathname,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="oneCategory" id={categoryInfo.id}>
      <div className={styles.categoryContainer} onClick={categoryHandler}>
        <Image
          src={`${process.env.NEXT_PUBLIC_CATEGORY_URL}${categoryInfo.photo}`}
          className={styles.image}
          width={400}
          height={600}
          alt={categoryInfo.name}
        />
        <p className={styles.categoryName}>{categoryInfo.name}</p>
      </div>
    </div>
  );
}
