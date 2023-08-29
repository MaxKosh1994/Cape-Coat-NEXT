import { useEffect, useState } from 'react';
import styles from './CartMin.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  delCartItemThunk,
  emptyCartThunk,
  getCartItemsThunk,
} from '../../app/thunkActionsCart';
import { getCartItems } from '../../app/cartSlice';
import Image from 'next/image';
import LikeButton from '@/components/likeButton/LikeButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';

export default function CartMin({ show, handleCartIconClick }) {
  const user = useSelector((state) => state.sessionSlice.user);
  const name = useSelector((state) => state.sessionSlice.name);
  const router = useRouter();
  const dispatch = useDispatch();
  const [cartItemsList, setCartItemsList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [delError, setDelError] = useState('');
  const [showDiv, setShowDiv] = useState(show);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await dispatch(getCartItemsThunk(user));
        setCartItemsList(cartItems);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCartItems();
  }, [dispatch, user]);

  useEffect(() => {
    const subtotalStock = cartItemsList
      .filter((item) => item.in_stock)
      .reduce((sum, item) => sum + item.new_price, 0);
    const subtotal = cartItemsList
      .filter((item) => !item.in_stock)
      .reduce((sum, item) => sum + item.price, 0);

    setCartTotal(subtotal + subtotalStock);
  }, [cartItemsList]);

  const handleDeleteItemFromCart = async (itemId) => {
    try {
      const data = { itemId, user };
      await dispatch(delCartItemThunk(data));
      const updatedCartItems = await dispatch(getCartItemsThunk(user));
      setCartItemsList(updatedCartItems);
    } catch (err) {
      console.log(err);
      setDelError('Не получилось удалить товар, попробуйте позже.');
    }
  };

  const emptyCart = async () => {
    const empty = await dispatch(emptyCartThunk(user));
    if (empty === 200) {
      setCartItemsList([]);
    }
  };

  const handleCloseCart = () => {
    setShowDiv((prev) => !prev);
    setTimeout(() => {
      handleCartIconClick();
    }, 1001);
  };

  return (
    <div
      className={`${styles.container}  ${
        cartItemsList.length === 0 ? styles.empty : ''
      } ${showDiv ? styles.showdiv : styles.hidediv}`}
    >
      <>
        {cartItemsList?.length === 0 ? (
          <>
            <p className={styles.emptyCartMsg}>
              Сейчас в вашей корзине пусто.{' '}
              <Link href="/catalog">Загляните в каталог</Link>
            </p>
          </>
        ) : (
          <>
            <div className={styles.headerCart}>
              <h1 className={styles.headerItemCart}>
                Корзина&nbsp;<span>({cartItemsList.length})</span>
              </h1>
              <button
                className={styles.basketItemDeleteButton}
                type="button"
                onClick={handleCloseCart}
              >
                <CloseIcon sx={{ fontSize: '2rem', color: '#656565' }} />
              </button>
            </div>

            <p className={styles.errorMsgCart}>{delError}</p>
            <div className={styles.cartContainer}>
              {cartItemsList.map((item) => (
                <div className={styles.basketItem} key={item.id}>
                  <div className={styles.basketItemLeft}>
                    <Link href={`/catalog/categoryName/${item.id}`}>
                      <Image
                        width={80}
                        height={100}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.Photos[0].photo}`}
                        alt={item.name}
                        className={styles.basketItemImage}
                      />
                    </Link>
                    <div className={styles.basketItemContentLeft}>
                      <Link
                        href={`/catalog/categoryName/${item.id}`}
                        className={styles.basketItemTitle}
                      >
                        {item.name}
                      </Link>
                      <div className={styles.basketItemProperties}>
                        <div>Артикул: {item.article}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.basketItemRight}>
                    <div className={styles.basketItemContentRight}>
                      <div className={styles.iconsContainer}>
                        <LikeButton itemId={item.id} />
                        <button
                          className={styles.basketItemDeleteButton}
                          type="button"
                          onClick={() => handleDeleteItemFromCart(item.id)}
                        >
                          <DeleteOutlineIcon
                            sx={{ fontSize: '2rem', color: '#656565' }}
                          />
                        </button>
                      </div>
                      {item.in_stock ? (
                        <>
                          <div className={styles.itemPrice}>
                            <span
                              className={`${styles.itemPricesPrice}  ${styles.strikethrough}`}
                            >
                              {item.price.toLocaleString()} &#8381;
                            </span>
                          </div>
                          <div className={styles.itemPrice}>
                            <span
                              className={`${styles.itemPricesPrice} ${styles.red}`}
                            >
                              {item.new_price.toLocaleString()} &#8381;
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className={styles.itemPrice}>
                          <span className={styles.itemPricesPrice}>
                            {item.price.toLocaleString()} &#8381;
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.totalOrder}>
                Сумма: {cartTotal.toLocaleString()} &#8381;
              </div>
              <Link href="/checkout">
                <button className={styles.orderButton}>
                  <span className={styles.buttonContent}>
                    Перейти к оформлению
                  </span>
                </button>
              </Link>
              <button className={styles.clearCartButton} onClick={emptyCart}>
                <span className={styles.buttonContent}>Очистить корзину</span>
              </button>
            </div>
          </>
        )}
      </>
    </div>
  );
}
