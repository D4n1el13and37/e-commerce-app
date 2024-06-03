import React from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import SliderMain from '../sliderMain/SliderMain';
import classes from './Hero.module.scss';
import Button from '../../components/ui/button/Button';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleCatalog = () => {
    navigate('/catalog');
  };

  return (
    <section className={cn(classes.hero__container, 'grid')}>
      <div className={classes.hero__left}>
        <h1 className={classes.hero__title}>
          We have the perfect plants for your workplace
        </h1>
        <Button isMain={true} isFilled={true} onClick={handleCatalog}>
          Explore Now
        </Button>
      </div>
      <div className={classes.hero__right}>
        <div className="hero__wrapper">
          <div className="hero__slider_wrapper">
            <div className="hero__slider_pagination" />
          </div>
          <div className="hero__slider_wrapper">
            <div className="hero__slider_scrollbar swiper-scrollbar" />
          </div>
          <SliderMain />
        </div>
      </div>
    </section>
  );
};

export default Hero;
