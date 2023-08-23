import React, { useEffect, useState } from 'react';

import { IconButton, List, Typography } from '@mui/material';
import { Box } from '@mui/system';
import './itemStyle.css';
import { Badge } from '@mui/base';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { grey } from '@mui/material/colors';
import { Link, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

// import { addCartItem } from '../../app/cartSlice';
// import { checkCartItemThunk } from '../../app/thunkActionsCart';

// import CustomImgModal from './item/cusomImgModal/CustomImgModal';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useAppDispatch } from '@/app/hooks';
import { setFavourites } from '@/app/favouriteSlice';
import CustomList from '../../../components/customList/CustomList';
import {
  fetchFavouritesData,
  fetchItemData,
} from '@/app/thunkActionsFavourite';
import { addCartItem } from '@/app/cartSlice';
import { checkCartItemThunk } from '@/app/thunkActionsCart';
import CustomImgModal from '../../../components/customImgModal/CustomImgModal';
import { RootState } from '@/app/store';
import { useRouter } from 'next/router';
import ItemLeftPart from '@/components/ItemLeftPart/ItemLeftPart';
import ItemRightPart from '@/components/ItemRightPart/ItemRightPart';

export default function Item() {
  // const router = useRouter();
  // const { category, item } = router.query;

  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [cartItemsList, setCartItemsList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  };

  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.sessionSlice.user);

  // const id: number = useParams().id;
  const router = useRouter();
  const { category, item } = router.query;
  console.log('id', router.query);
  // const location = useLocation().state;

  const itemData = useSelector((state: RootState) => state.itemSlice.item);
  const cartData = useSelector((state: RootState) => state.cartSlice.cartItems);
  const materialsData = useSelector(
    (state: RootState) => state.itemSlice.materials
  );

  const favourites = useSelector(
    (state: RootState) => state.favouriteSlice.favourites
  );

  useEffect(() => {
    dispatch(fetchItemData(item));
    dispatch(fetchFavouritesData(item));
    dispatch(checkCartItemThunk(item));
    // dispatch(getCartItemsThunk(id))
  }, [dispatch, item]);

  useEffect(() => {
    const checkLike = favourites.some((el) => el.item_id === +item);
    setIsLiked(checkLike);
  }, [favourites, item]);

  useEffect(() => {
    const isInCart = cartData.some((el) => el.item_id === +item);
    setIsInCart(isInCart);
  }, [cartData, item]);
  const favHandler = async () => {
    try {
      if (user) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}item/favourites/${item}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          }
        );

        if (res.ok) {
          setIsLiked(!isLiked);
          const data = await res.json();
          console.log('data', data);
          dispatch(setFavourites(data));
        }
      } else {
        // navigate('/signin');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cartHandler = async () => {
    try {
      if (!isInCart) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}cart/item/${item}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          }
        );

        if (res.ok) {
          setIsInCart(true);
          const data = await res.json();
          const addToCart = data.newCartItem;

          dispatch(addCartItem(addToCart));
        }
      } else {
        // navigate('/cart');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const materialsUrl = process.env.NEXT_PUBLIC_MATERIALS_URL;
  const textileData = materialsData?.map((material) => ({
    id: material.id,
    url: `${materialsUrl}${material.photo}`,
  }));

  const imageData = itemData?.Photos?.map((photo, index) => ({
    id: index + 1,
    url: `${imageUrl}${photo.photo}`,
  }));

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="wrapper wrapper-product">
      <div>
        <div className="product">
          <div className="product__wrapper">
            <ItemLeftPart imageData={imageData} />

            <ItemRightPart itemData={itemData} item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}

// <>
// <div
// style={{
//   height: '100%',
//   display: 'flex',
//   justifyContent: 'start',
//   alignItems: 'center',
//   flexDirection: 'column',
// }}
// >
// <Typography variant="h1" gutterBottom textAlign={'center'}>
//   {itemData.name}
// </Typography>
// <div className="Carousel_div">
//   {/* <CustomCarousel imageData={imageData} /> */}
//   123
// </div>

// <div className="product__container">
//   <Box
//     sx={{
//       class: 'list-box',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'end',
//       alignItems: 'flex-end',
//       marginBottom: '50px',
//     }}
//   >
//     <List>
//       <CustomList name="Описание" data={itemData.description} />
//       <CustomList
//         name="Характеристики"
//         data={itemData.characteristics}
//       />
//       <CustomList name="Размеры" data={itemData.model_sizes} />
//       <CustomList
//         name="Указания по уходу"
//         data={itemData.care_instructions}
//       />
//     </List>
//   </Box>
//   <div
//     style={{
//       display: 'flex',
//       flexDirection: 'column',
//       marginBottom: '20px',
//     }}
//   >
//     <div className="product__btn">
//       <div className="product__actions-button">
//         <button
//           onClick={cartHandler}
//           type="button"
//           className={`ui-button ui-button-wide ui-button-dark${
//             isInCart ? ' in-cart' : ''
//           }`}
//         >
//           <div className="ui-ripple">
//             <div
//               className={`ui-button-content${
//                 isInCart ? ' in-cart' : ''
//               }`}
//             >
//               {isInCart ? 'В корзине' : 'В корзину'}
//             </div>
//           </div>
//         </button>
//         {isLiked ? (
//           <IconButton onClick={favHandler} size="small">
//             <Badge>
//               <FavoriteIcon
//                 sx={{ fontSize: '3rem', color: 'black' }}
//               />
//             </Badge>
//           </IconButton>
//         ) : (
//           <IconButton onClick={favHandler} size="small">
//             <Badge>
//               <FavoriteBorderOutlinedIcon
//                 sx={{ fontSize: '3rem', color: 'black' }}
//               />
//             </Badge>
//           </IconButton>
//         )}
//       </div>
//       <span className="price_text">{`${itemData.price
//         .toLocaleString()
//         .replace(/,\s?/g, ' ')} ₽`}</span>
//       <div
//         className="textile_choose_div"
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         <span className="textile_choose">
//           Примеры материалов изделия
//         </span>
//         <div className="materials">
//           {textileData.map((textile, index) => (
//             <div
//               className={`textile_icons${
//                 index === 0 ? ' first' : ''
//               }${index === textileData.length - 1 ? ' last' : ''}`}
//               key={textile.id}
//               onClick={() => handleImageClick(textile.url)}
//             >
//               <img
//                 src={textile.url}
//                 alt={`Textile ${textile.id}`}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                   borderRadius: '5px',
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
// {/*  */}
// <div className="product_info">
// <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>
//   Все изделия отшиваются под заказ, заполните свои данные в{' '}
//   {/* <Link to="/account/measurements">личном кабинете</Link>. */}
// </h2>
// </div>
// <CustomImgModal
// open={openModal}
// onClose={() => setOpenModal(false)}
// imageUrl={selectedImage}
// />
// </>
