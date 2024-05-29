import React from 'react';
import Modal from 'react-modal';

import srcPlants from './img/successModalImg.svg';

import './SuccessModal.scss';
import modal from './SuccessModal.module.scss';

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const SuccessModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Success Modal"
    ariaHideApp={false}
    shouldCloseOnOverlayClick={true}
    className="ReactModal__Content"
    overlayClassName="ReactModal__Overlay"
    closeTimeoutMS={100}
  >
    <div className={modal.modal}>
      <div className={modal.modal__content}>
        <p className={modal.modal__text}>Success!</p>
      </div>
      <img src={srcPlants} alt="Illustartion happy plant" />
    </div>
  </Modal>
);
export default SuccessModal;
