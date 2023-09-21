import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

import styles from './ProductCard.module.css';

interface FavoriteIconButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  itemId?: number;
}

const FavoriteIconButton: React.FC<FavoriteIconButtonProps> = ({
  isFavorite,
  onClick,
  itemId,
}) => {
  return (
    <IconButton
      className={styles.IconImage}
      aria-label="Add to favorites"
      onClick={onClick}
    >
      {isFavorite ? (
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
