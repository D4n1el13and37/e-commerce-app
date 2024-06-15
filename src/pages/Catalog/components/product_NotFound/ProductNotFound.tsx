import React from 'react';
import { useNavigate } from 'react-router-dom';
import SurprisedPlant from './surprised-plant.svg';
import s from './ProductNotFound.module.scss';
import Button from '../../../../components/ui/button/Button';

const ProductNotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBackClick = () => {
    navigate('/catalog');
  };

  return (
    <>
      <section className={s.not_found_section}>
        <div className="container grid">
          <div className={s.not_found_section__left}>
            <h1 className={s.not_found_section__title}>Woooh</h1>
            <p className={s.not_found_section__descr}>
              This category have no products or doesn't exist.
            </p>
            <Button isMain={true} onClick={handleGoBackClick}>
              Back to catalog
            </Button>
          </div>
          <div className={s.not_found_section__right}>
            <img src={SurprisedPlant} alt="Page not found" aria-hidden="true" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductNotFound;
