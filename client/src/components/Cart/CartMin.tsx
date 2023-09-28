import { MouseEvent, useEffect, useState } from 'react';
import styles from './CartMin.module.css';
import Link from 'next/link';
import Image from 'next/image';
import LikeButton from '@/components/likeButton/LikeButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useCartControl } from './useCartControl';
import DelBtn from './DelBtn';
import { RootState } from '@/app/store';
import { emptyCart } from '@/app/cartSlice';
import { setCartTotal } from '@/app/cartControlSlice';
import { emptyCartThunk } from '@/app/thunkActionsCart';

const CartMin: React.FC<{
  show: boolean;
  handleCartIconClick: (e: MouseEvent<HTMLButtonElement>) => void;
}> = ({ show, handleCartIconClick }) => {
  const dispatch = useAppDispatch();
  const { delError, fetchCartItems } = useCartControl();
  const user = useAppSelector((state: RootState) => state.sessionSlice.user);
  const cartItemsList = useAppSelector(
    (state: RootState) => state.cartSlice.cartItems
  );
  const [showDiv, setShowDiv] = useState<boolean>(show);

  useEffect(() => {
    fetchCartItems();
  }, [dispatch, user]);

  useEffect(() => {
    const subtotalStock = cartItemsList
      .filter((item) => item.in_stock)
      .reduce((sum, item) => sum + item.new_price, 0);
    const subtotal = cartItemsList
      .filter((item) => !item.in_stock)
      .reduce((sum, item) => sum + item.price, 0);

    dispatch(setCartTotal(subtotal + subtotalStock));
  }, [cartItemsList]);

  const emptyCartMin = async () => {
    user
      ? await dispatch(emptyCartThunk())
      : localStorage.setItem('cartItems', '[]');
    fetchCartItems();
  };

  const handleCloseCart = (e: MouseEvent<HTMLButtonElement>) => {
    setShowDiv((prev) => !prev);
    setTimeout(() => {
      handleCartIconClick(e);
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
          <div className={styles.headerCart}>
            <p className={styles.emptyCartMsg}>
              Сейчас в вашей корзине пусто.{' '}
              <Link href="/catalog">Загляните в каталог</Link>
            </p>
            <button
              className={styles.basketItemDeleteButton}
              type="button"
              onClick={handleCloseCart}
            >
              <CloseIcon sx={{ fontSize: '2rem', color: '#656565' }} />
            </button>
          </div>
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
                      <div className={styles.basketItemProperties}>
                        <div>
                          Материал: {item.Material.name.split(' - ')[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.basketItemRight}>
                    <div className={styles.basketItemContentRight}>
                      <div className={styles.iconsContainer}>
                        <LikeButton itemId={item.id} />
                        <DelBtn itemId={item.id} />
                      </div>
                      {item.in_stock ? (
                        <div className={styles.twoPrices}>
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
                        </div>
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
                Сумма:{' '}
                {cartItemsList
                  .reduce((sum, item) => sum + item.price, 0)
                  .toLocaleString()}{' '}
                &#8381;
              </div>
              <Link href="/checkout">
                <button className={styles.orderButton}>
                  <span className={styles.buttonContent}>
                    Перейти к оформлению
                  </span>
                </button>
              </Link>
              <button className={styles.clearCartButton} onClick={emptyCartMin}>
                <span className={styles.buttonContent}>Очистить корзину</span>
              </button>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default CartMin;
