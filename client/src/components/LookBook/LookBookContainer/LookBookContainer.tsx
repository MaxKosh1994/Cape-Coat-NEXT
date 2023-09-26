import React, { useEffect, useState } from 'react';
import { LookBookDataType } from '../data';
import styles from './LookBookContainer.module.css';
import Image from 'next/image';

export type LookBookContainerProps = {
  content: LookBookDataType;
};

export default function LookBookContainer({ content }: LookBookContainerProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topBlock}>
        <div className={styles.topBlock__big}>
          <Image
            src={`${process.env.NEXT_PUBLIC_LOOKBOOK_URL}${content?.bigTopBlock}`}
            alt=''
            width={600}
            height={800}
            className={styles.bigImage}
          />
        </div>
        <div
          className={styles.topBlock__little}
          style={{ transform: `translateY(${-scrollPosition * 0.3}px)` }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_LOOKBOOK_URL}${content?.littleTopBlock}`}
            alt=''
            width={450}
            height={600}
            className={styles.littleImage}
          />
        </div>
      </div>

      {content.bigBottomBlock && (
        <div className={styles.bottomBlock}>
          <div className={styles.bottomBlock__big}>
            <Image
              src={`${process.env.NEXT_PUBLIC_LOOKBOOK_URL}${content?.bigBottomBlock}`}
              alt=''
              width={600}
              height={800}
              className={styles.bigImage}
            />
          </div>
          <div
            className={styles.bottomBlock__little}
            style={{ transform: `translateY(${-scrollPosition * 0.31}px)` }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_LOOKBOOK_URL}${content?.littleBottomBlock}`}
              alt=''
              width={450}
              height={600}
              className={styles.littleImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
