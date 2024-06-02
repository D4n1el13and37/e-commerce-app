import React from 'react';

import srcPlants from './img/successModalImg.svg';

import './SuccessModal.scss';
import modal from './SuccessModal.module.scss';

interface CustomModalProps {
  isOpen: boolean;
}

const SuccessModal: React.FC<CustomModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className={`${modal.modal} ${isOpen ? modal.show : ''}`}>
      <div className={modal.modal__content}>
        <p className={modal.modal__text}>Success!</p>
      </div>
      <img src={srcPlants} alt="Illustartion happy plant" />
    </div>
  );
};

export default SuccessModal;
