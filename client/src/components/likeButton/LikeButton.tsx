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
    if (favourites.length > 0) {
      const checkLike = favourites.some((el) => el.item_id == itemId);
      setIsLiked(checkLike);
    }
  }, []);

  const favHandler = async () => {
    if (itemId) {
      dispatch(fetchOneFavourite(itemId));
      setIsLiked(!isLiked);
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
