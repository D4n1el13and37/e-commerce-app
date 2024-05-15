import React from 'react';
import Slider from '../slider/Slider';
import classes from './Hero.module.scss';
import Button from '../../components/ui/button/Button';

const Hero: React.FC = () => (
  <section className={`${classes.hero__container} grid`}>
    <div className={classes.hero__left}>
      <h1 className={classes.hero__title}>
        We have the perfect plants for your workplace
      </h1>
      <Button isMain={true} isFilled={true}>
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
        <Slider />
      </div>
    </div>
  </section>
);

export default Hero;
