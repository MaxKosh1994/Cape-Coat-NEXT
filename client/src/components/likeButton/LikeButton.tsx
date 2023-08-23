import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { IconButton } from '@mui/material';
import { Badge } from '@mui/base';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector } from 'react-redux';

import { fetchOneFavourite } from '@/app/thunkActionsFavourite';

interface LikeButtonProps {
  item: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);
  const user = useSelector((state: RootState) => state.sessionSlice.user);
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(
    (state: RootState) => state.favouriteSlice.favourites
  );

  useEffect(() => {
    const checkLike = favourites.some((el) => el.item_id === +item);
    setIsLiked(checkLike);
  }, [favourites, item]);

  const favHandler = async () => {
    dispatch(fetchOneFavourite(item));
    setIsLiked(!isLiked);
  };

  return (
    <IconButton onClick={favHandler} size="small">
      <Badge>
        {isLiked ? (
          <FavoriteOutlinedIcon sx={{ fontSize: '2rem', color: 'red' }} />
        ) : (
          <FavoriteBorderOutlinedIcon
            sx={{ fontSize: '2rem', color: 'black' }}
          />
        )}
      </Badge>
    </IconButton>
  );
};
export default LikeButton;
