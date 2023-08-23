import { useState } from "react";

const [isCart, setIsCart] = useState(initialIsCart);



const cartHandler = async (): Promise<void> => {
  setIsCart((prevIsCart) => !prevIsCart);
  dispatch(toggleCart(id));
  try {
    if (!user) {
      // navigate('/signin');
      return;
    }
    if (isCart === false) {
      const cartData = {
        id,
        article,
        photo,
        name,
        newPrice,
        price,
        isFavorite,
        isCart,
      };
      const inCart = await addToCart(cartData);
      const itemInCart = inCart[0];
      setIsCart(itemInCart);
      dispatch(addCartItem(inCart));
    } else {
      const cartData = {
        id,
        article,
        photo,
        name,
        newPrice,
        price,
        isFavorite,
        isCart,
      };
      const delCart = await removeFromCart(cartData);
      dispatch(removeItem(delCart));
      const updatedCartItems = await dispatch(getCartItemsThunk(user));
    }
  } catch (err) {
    console.log(err);
  }
};


export default cartHandler