import React from 'react';
import { IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

import styles from './ProductCard.module.css';

interface FavoriteIconButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  itemId: number;
}

const FavoriteIconButton: React.FC<FavoriteIconButtonProps> = ({
  isFavorite,
  onClick,
  itemId,
}) => {
  const localStorageData = localStorage.getItem('favorites');
  // console.log(loc)

  // Парсинг данных из строки JSON
  const favoriteItems = JSON.parse(localStorageData || '[]');
  // console.log(favoriteItems)

  // Проверка наличия товара в локальном хранилище
  const isItemInFavorites = favoriteItems.includes(itemId);
  // console.log('icon', isItemInFavorites);

  return (
    <IconButton
      className={styles.IconImage}
      aria-label="Add to favorites"
      onClick={onClick}
    >
      {isFavorite || isItemInFavorites ? (
        <FavoriteIcon
          className={styles.IconImage}
          style={{ color: 'rgb(0 0 0 / 70%)' }}
        />
      ) : (
        <FavoriteBorderOutlinedIcon className={styles.IconImage} />
      )}
    </IconButton>
  );
};

export default FavoriteIconButton;
