import React from 'react';

import cl from './Loader.module.scss';
import srcPlants from './run.gif';

const Loader: React.FC = () => (
  <div className={cl.modal__wrapper}>
    <div className={cl.modal}>
      <img src={srcPlants} alt="Illustartion happy plant" />
      <h3 className={cl.modal__title}>Wait a bit!</h3>
    </div>
  </div>
);
export default Loader;
