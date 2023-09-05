import React from 'react';
import styles from '../../styles/Home.module.css';
import Image from 'next/image';
import { Typography } from '@mui/material';
import Link from 'next/link';

interface VerticalBlockProps {
  blockName: string;
  imgUrl: string;
  url: string;
}

export default function VerticalBlock({
  blockName,
  imgUrl,
  url,
}: VerticalBlockProps) {
  return (
    <div className={styles.verticalContainer}>
      <Image src={imgUrl} alt="" fill={true} className={styles.verticalImg} />
      <div className={styles.textVerticalImg}>
        <Typography>
          <span>{blockName}</span>
          <Link href={`/catalog/${url}`}>
            <button>ПОСМОТРЕТЬ РАЗДЕЛ</button>
          </Link>
        </Typography>
      </div>
    </div>
  );
}
