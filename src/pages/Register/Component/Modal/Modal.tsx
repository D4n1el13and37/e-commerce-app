import React from 'react';
import Modal from 'react-modal';

import modal from './RigisterModal.module.scss';
import Button from '../../../../components/ui/button/Button';

import './Modal.scss';
import srcPlants from '../../../../../public/plantsModal.svg';

interface CustomModalProps {
  header?: string;
  subheader?: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

const ModalRegistration: React.FC<CustomModalProps> = ({
  header = 'Registration successful!',
  subheader = 'You will be logged in automatically.',
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
    <div className={modal.modal}>
      <img src={srcPlants} alt="Illustartion happy plant" />
      <div className={modal.modal__content}>
        <h2 className={modal.modal__title}>{header}</h2>
        <p className={modal.modal__text}>{subheader}</p>
      </div>

      <Button isFilled={true} isMain={true} onClick={onRequestClose}>
        Close
      </Button>
    </div>
  </Modal>
);
export default ModalRegistration;
