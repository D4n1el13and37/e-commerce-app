import { useState } from 'react';
import BasketCard from '../BasketCard';
import Button from '../../../../components/ui/button/Button';
import EmptyCart from '../empty/EmptyCart';

import cl from './BasketContent.module.scss';
import ClearModal from '../clear/ClearModal';

const BasketContent = () => {
  const [mockArray, setMockArray] = useState([1]);
  const [modalIsShown, setModalIsShown] = useState(false);

  const clearBasketHandle = () => {
    setModalIsShown(true);
  };

  const cartClearHandle = () => {
    setMockArray([]);
    setModalIsShown(false);
  };

  const closeModal = () => {
    setModalIsShown(false);
  };

  return (
    <div className={cl.main__wrapper}>
      <h1 className={cl.main__title}>Shopping Bag</h1>
      {modalIsShown && (
        <ClearModal cartClearHandle={cartClearHandle} closeModal={closeModal} />
      )}
      {mockArray.length ? (
        <>
          <BasketCard />
          <BasketCard />
          <BasketCard />
          <Button isMain={true} onClick={clearBasketHandle}>
            Clear cart
          </Button>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default BasketContent;
