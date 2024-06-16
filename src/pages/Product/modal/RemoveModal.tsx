import React from 'react';
import srcPlants from './sad-plant.svg';
import modal from './RemoveModal.module.scss';

interface CustomModalProps {
  isOpen: boolean;
}

const RemoveModal: React.FC<CustomModalProps> = ({ isOpen }) => (
  <div className={`${modal.modal} ${isOpen ? modal.show : ''}`}>
    <div className={modal.modal__content}>
      <p className={modal.modal__text}>Remove</p>
    </div>
    <img src={srcPlants} alt="Illustartion sad plant" />
  </div>
);
export default RemoveModal;
