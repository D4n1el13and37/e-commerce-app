import { useState } from 'react';
// import BasketCard from '../BasketCard';
// import Button from '../../../../components/ui/button/Button';
import EmptyCart from '../empty/EmptyCart';

import cl from './BasketContent.module.scss';
import ClearModal from '../clear/ClearModal';
import useAppSelector from '../../../../hooks/useAppSelector';
import madeCorrectOutputPrice from '../../../../utils/madeCorrectOutputPrice';
import BasketCard from '../basketCard/BasketCard';

const BasketContent = () => {
  const { cartItems, cart } = useAppSelector((state) => state.cart);
  const FULL_PRICE = madeCorrectOutputPrice(cart.totalPrice?.centAmount || 0);
  const [modalIsShown, setModalIsShown] = useState(false);

  const clearBasketHandle = () => {
    setModalIsShown(true);
  };

  const cartClearHandle = () => {
    // setMockArray([]);
    setModalIsShown(false);
  };

  const closeModal = () => {
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
                <div>
                  <span onClick={clearBasketHandle}>clear basket</span>
                  <span className={cl.full_price__wrapper_text}>
                    {FULL_PRICE}
                  </span>
                </div>
              </div>
            </>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </>
    // <div className={cl.main__wrapper}>
    //   <h1 className={cl.main__title}>Shopping Bag</h1>
    //   {modalIsShown && (
    //     <ClearModal cartClearHandle={cartClearHandle} closeModal={closeModal} />
    //   )}
    //   {mockArray.length ? (
    //     <>
    //       <BasketCard />
    //       <BasketCard />
    //       <BasketCard />
    //       <Button isMain={true} onClick={clearBasketHandle}>
    //         Clear cart
    //       </Button>
    //     </>
    //   ) : (
    //     <EmptyCart />
    //   )}
    // </div>
  );
};

export default BasketContent;
