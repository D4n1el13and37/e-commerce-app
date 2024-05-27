import React from 'react';
import Modal from 'react-modal';

import srcPlants from '../../../../../public/succesModalImg.svg';

import './SuccesModal.scss';
import modal from './succesModal.module.scss';

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const ModalRegistration: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Success Modal"
    ariaHideApp={true}
    shouldCloseOnOverlayClick={true}
    className="ReactModal__Content"
    overlayClassName="ReactModal__Overlay"
    closeTimeoutMS={100}
  >
    <div className={modal.modal}>
      <div className={modal.modal__content}>
        <p className={modal.modal__text}>Successful!</p>
      </div>
      <img src={srcPlants} alt="Illustartion happy plant" />
    </div>
  </Modal>
);
export default ModalRegistration;
