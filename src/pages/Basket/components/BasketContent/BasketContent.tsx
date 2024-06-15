import { useState } from 'react';
import EmptyCart from '../empty/EmptyCart';
import cl from './BasketContent.module.scss';
import ClearModal from '../clear/ClearModal';
import useAppSelector from '../../../../hooks/useAppSelector';
import madeCorrectOutputPrice from '../../../../utils/madeCorrectOutputPrice';
import BasketCard from '../basketCard/BasketCard';
import { getCart, removeCart } from '../../../../store/cartSlice';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import DiscountBlock from '../discount/DiscountBlock';

const BasketContent = () => {
  const { cartItems, cart } = useAppSelector((state) => state.cart);
  const FULL_PRICE = madeCorrectOutputPrice(cart.totalPrice?.centAmount || 0);
  const dispatch = useAppDispatch();
  const [modalIsShown, setModalIsShown] = useState(false);

  const openModal = () => {
    setModalIsShown(true);
    document.body.style.overflow = 'hidden'; // for block scrolling
  };

  const closeModal = () => {
    setModalIsShown(false);
    document.body.style.overflow = 'auto';
  };

  const cartClearHandle = async () => {
    await dispatch(removeCart());
    // we need to get cart after remove otherwise we got error
    await dispatch(getCart());
    setModalIsShown(false);
  };

  return (
    <>
      <h1 className={cl.main__title}>Shopping Bag</h1>
      {modalIsShown && (
        <ClearModal cartClearHandle={cartClearHandle} closeModal={closeModal} />
      )}
      <div className={cl.content__wrapper}>
        {cartItems.length ? (
          <>
            <div className={cl.card_list__wrapper}>
              {cartItems.map((card) => (
                <BasketCard
                  key={card.id}
                  id={card.id}
                  productId={card.productId}
                  name={card.name['en-US']}
                  price={card.price}
                  image={card.variant.images!}
                  attributes={card.variant.attributes!}
                  quantity={card.quantity}
                />
              ))}
              <>
                <div className={cl.full_price__wrapper}>
                  <span className={cl.full_price__wrapper_text}>Total</span>
                  <hr className={cl.full_price__wrapper_dash} />
                  <div className={cl.full_price__bottom_wrapper}>
                    <span
                      className={cl.full_price__bottom_wrapper_clear}
                      onClick={openModal}
                    >
                      clear basket
                    </span>
                    <span className={cl.full_price__wrapper_text}>
                      {FULL_PRICE}
                    </span>
                  </div>
                </div>
              </>
            </div>
            <div className={cl.discount__wrapper}>
              <DiscountBlock />
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </>
  );
};

export default BasketContent;
