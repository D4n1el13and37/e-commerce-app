import React from 'react';
import classes from './Home.module.scss';
import Button from '../../components/ui/button/Button';
import Slider from '../../components/slider/Slider';

const Home: React.FC = () => (
  <section className={`${classes.hero__container} grid`}>
    <div className={`${classes.hero__left}`}>
      <h1 className={`${classes.hero__title}`}>
        We have the perfect plants for your workplace
      </h1>
      <Button isMain={true} isFilled={true}>
        Explore Now
      </Button>
    </div>
    <div className={`${classes.hero__right}`}>
      <div className="hero__wrapper">
        <div className="hero__slider_wrapper">
          <div className="hero__slider_pagination"></div>
        </div>
        <div className="hero__slider_wrapper">
          <div className="hero__slider_scrollbar swiper-scrollbar"></div>
        </div>
        <Slider />
      </div>
    </div>
  </section>
);

export default Home;
