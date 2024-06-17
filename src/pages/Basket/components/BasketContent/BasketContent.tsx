import { useState } from 'react';
import EmptyCart from '../empty/EmptyCart';
import cl from './BasketContent.module.scss';
import ClearModal from '../clear/ClearModal';
import useAppSelector from '../../../../hooks/useAppSelector';
import madeCorrectOutputPrice from '../../../../utils/madeCorrectOutputPrice';
import BasketCard from '../basketCard/BasketCard';
import { clearCart, deleteDiscounts } from '../../../../store/cartSlice';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import DiscountBlock from '../discount/DiscountBlock';

const BasketContent = () => {
  const { cartItems, cart } = useAppSelector((state) => state.cart);
  const fullPrice = madeCorrectOutputPrice(cart.totalPrice?.centAmount || 0);
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
    await dispatch(deleteDiscounts());
    await dispatch(clearCart());
    setModalIsShown(false);
  };

  function calculateTotalWithoutDiscount(): number {
    return cartItems.reduce(
      (prev, curr) => prev + curr.price.value.centAmount * curr.quantity,
      0
    );
  }
  const totalPriceWithoutDiscount = madeCorrectOutputPrice(
    calculateTotalWithoutDiscount()
  );

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
                  discount={card.discountedPricePerQuantity}
                  totalPrice={card.totalPrice.centAmount}
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
                    <div className={cl.full_price__wrapper_output}>
                      {totalPriceWithoutDiscount !== fullPrice && (
                        <span className={cl.full_price__wrapper_old}>
                          {totalPriceWithoutDiscount}
                        </span>
                      )}
                      <span className={cl.full_price__wrapper_text}>
                        {fullPrice}
                      </span>
                    </div>
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
