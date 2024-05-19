import React from 'react';
import Modal from 'react-modal';
import './Modal.scss';
// import Button from '../../../../components/ui/button/Button';

import modal from './RigisterModal.module.scss';

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
    contentLabel="Notification Modal"
    ariaHideApp={false}
    shouldCloseOnOverlayClick={false}
    className="ReactModal__Content"
    overlayClassName="ReactModal__Overlay"
  >
    <div className={`${modal.modal}`}>
      <img src="public/plantsModal.svg" alt="Illustartion happy plant" />
      <div className={`${modal.modal__content}`}>
        <h2 className={`${modal.modal__title}`}>Registration successful!</h2>
        <p className={`${modal.modal__text}`}>
          You will be logged in automatically.
        </p>
      </div>

      {/* <Button isFilled={true} isMain={true} onClick={onRequestClose}>
        Close
      </Button> */}
    </div>
  </Modal>
);
export default ModalRegistration;
