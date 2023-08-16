import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/Catalog.module.css';
// import Category from '../Category/Category';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Category from '../../../pages/catalog/[category]';
import { ICategoryList } from '@/TypeScript/categoryList.type';
import { useNavigate } from 'react-router-dom';

export default function CategoryList({
  id,
  imageUrl,
  category,
}: ICategoryList) {
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

  //TODO подумать над query, чтобы не отображалось в адресной строке
  const categoryHandler = async(e) => {
    const target = e.target;
    if (!target) return; // Проверка наличия целевого элемента
    const parent = target.closest('.oneCategory').id;
    const pathname =
      englishName === 'Trench coats'
        ? '/catalog/trench'
        : `/catalog/${englishName.toLowerCase()}`;


        // try {
        //   const response = await fetch(`${pathname}?id=${parent}`);
      
        //   if (response.ok) {
        //     // Делайте что-то с успешным ответом, например, ничего не делайте, если вам не нужно обрабатывать ответ
        //     console.log(response)
        //   } else {
        //     console.error('Ошибка при выполнении запроса на сервер');
        //   }
        // } catch (error) {
        //   console.error('Ошибка при выполнении запроса на сервер:', error);
        // }

        router.push(
          {
            pathname,
            query: { id: parent },
          },
          undefined,
          { shallow: true } // Здесь shallow: true
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
