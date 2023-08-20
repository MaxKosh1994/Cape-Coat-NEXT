import React from 'react';
import { IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface FavoriteIconButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

const FavoriteIconButton: React.FC<FavoriteIconButtonProps> = ({
  isFavorite,
  onClick,
}) => {
  return (
    <IconButton aria-label="Add to favorites" onClick={onClick}>
      {isFavorite ? (
        <FavoriteIcon style={{ color: 'rgb(0 0 0 / 70%)' }} />
      ) : (
        <FavoriteBorderOutlinedIcon />
      )}
    </IconButton>
  );
};

export default FavoriteIconButton;