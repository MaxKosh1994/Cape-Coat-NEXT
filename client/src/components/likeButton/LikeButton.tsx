import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { RootState } from '@/app/store';
import { IconButton } from '@mui/material';
import { Badge } from '@mui/base';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector } from 'react-redux';

import {
  fetchFavouritesData,
  fetchItemData,
  fetchOneFavourite,
} from '@/app/thunkActionsFavourite';
import { setFavourites } from '@/app/favouriteSlice';

interface LikeButtonProps {
  itemId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ itemId }) => {
  const [isLiked, setIsLiked] = useState(false);

  const user = useSelector((state: RootState) => state.sessionSlice.user);
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(
    (state: RootState) => state.favouriteSlice.favourites
  );

  useEffect(() => {
    dispatch(fetchItemData(itemId));
    dispatch(fetchFavouritesData());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const checkLike = favourites.some((el) => el.item_id == itemId);
      setIsLiked(checkLike);
    } else {
      const likeFromStorage = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      );
      const isItemInFav = likeFromStorage.includes(itemId);
      setIsLiked(isItemInFav);
    }
  }, [favourites, user, itemId]);

  const favHandler = async () => {
    if (!user) {
      const favoritesFromStorage =
        JSON.parse(localStorage.getItem('favorites')) || [];

      const isItemInFavorites = favoritesFromStorage.includes(itemId);

      if (isItemInFavorites) {
        const updatedFavorites = favoritesFromStorage.filter(
          (favId) => favId !== itemId
        );
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsLiked(!isLiked);
        await dispatch(setFavourites(updatedFavorites));
      } else {
        const updatedFavorites = [...favoritesFromStorage, itemId];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsLiked(!isLiked);
        await dispatch(setFavourites(updatedFavorites));
      }
    } else {
      if (itemId) {
        await dispatch(fetchOneFavourite(itemId));
        setIsLiked(!isLiked);
      }
    }
  };

  return (
    <IconButton onClick={favHandler} size="small">
      <Badge>
        {isLiked ? (
          <FavoriteOutlinedIcon sx={{ fontSize: '2rem', color: '#656565' }} />
        ) : (
          <FavoriteBorderOutlinedIcon
            sx={{ fontSize: '2rem', color: '#656565' }}
          />
        )}
      </Badge>
    </IconButton>
  );
};
export default LikeButton;
