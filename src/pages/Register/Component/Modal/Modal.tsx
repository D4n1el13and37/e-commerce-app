import React from 'react';
import Modal from 'react-modal';
// import Button from '../../../../components/ui/button/Button';

import modal from './RigisterModal.module.scss';

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
const customStyles = {
  content: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    margin: '0',
    border: 'none',
    background: 'white',
    overflow: 'auto',
    borderRadius: '0',
    outline: 'none',
    padding: '20px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

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
    style={customStyles}
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
