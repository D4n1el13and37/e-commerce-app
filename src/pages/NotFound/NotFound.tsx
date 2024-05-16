import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Button from '../../components/ui/button/Button';

import SadPlant from './sad-plant.svg';
import s from './NotFound.module.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <section className={s.not_found_section}>
        <div className="container grid">
          <div className={s.not_found_section__left}>
            <h1 className={s.not_found_section__title}>404 Error</h1>
            <p className={s.not_found_section__descr}>
              Page not found. Let's get you back on track!
            </p>
            <Button isMain={true} onClick={handleGoBackClick}>
              Back to main
            </Button>
          </div>
          <div className={s.not_found_section__right}>
            <img src={SadPlant} alt="Page not found" aria-hidden="true" />
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
