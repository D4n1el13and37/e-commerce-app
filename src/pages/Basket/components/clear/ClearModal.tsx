import React from 'react';
import Button from '../../../../components/ui/button/Button';
import sureImage from './sure.svg';

import cl from './ClearModal.module.scss';

interface ClearModalProps {
  cartClearHandle: () => void;
  closeModal: () => void;
}

const ClearModal: React.FC<ClearModalProps> = ({
  cartClearHandle,
  closeModal,
}) => {
  const clearBasket = () => {
    cartClearHandle();
    closeModal();
  };

  return (
    <div className={cl.modal__wrapper}>
      <div className={cl.modal__content}>
        <div className={cl.image__wrapper}>
          <img src={sureImage} alt="" />
        </div>
        <div className={cl.text__wrapper}>
          <h4 className={cl.text__title}>
            Are you sure? <br />
            You want to clear the cart?
          </h4>
          <div className={cl.text__buttons_block}>
            <Button isMain={true} onClick={clearBasket}>
              Yes!
            </Button>
            <Button isMain={true} isFilled={true} onClick={closeModal}>
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearModal;
