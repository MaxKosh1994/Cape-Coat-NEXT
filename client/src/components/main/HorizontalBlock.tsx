import React from 'react';
import styles from '../../styles/Home.module.css';
import Image from 'next/image';
import { Typography } from '@mui/material';
import Link from 'next/link';

interface HorizontalBlockProps {
  blockName: string;
  imgName: string;
}

export default function HorizontalBlock({
  blockName,
  imgName,
}: HorizontalBlockProps) {
  return (
    <div className={styles.horizontalContainer}>
      <Image
        src={`${process.env.NEXT_PUBLIC_MAIN_URL}/${imgName}`}
        alt=""
        fill={true}
        className={styles.horizImg}
      />
      <div className={styles.textHorizImg}>
        <Typography>
          <span>{blockName}</span>
        </Typography>
        <Link href={`/catalog/${blockName}`}>
          <button>ПОСМОТРЕТЬ РАЗДЕЛ</button>
        </Link>
      </div>
    </div>
  );
}
