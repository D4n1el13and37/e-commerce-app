import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Slider.scss';

import slide1 from './slide-1.png';
import slide2 from './slide-2.png';

const Slider: React.FC = () => {
  const slideContent = ['Flowering', 'Green', 'Succulents', 'Miniatures'];

  return (
    <>
      <Swiper
        direction={'vertical'}
        scrollbar={{
          hide: false,
          draggable: true,
          dragSize: 24,
          enabled: true,
          verticalClass: 'hero__slider_scrollbar_vertical',
          el: '.hero__slider_scrollbar',
        }}
        pagination={{
          clickable: true,
          enabled: true,
          el: '.hero__slider_pagination',
          renderBullet(index, className) {
            const slideName = slideContent[index];
            return `<span class="${className}">${slideName}</span>`;
          },
        }}
        modules={[Pagination, Scrollbar]}
        className="hero__slider"
      >
        <SwiperSlide>
          <img src={slide1} alt="Flowering" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="Green" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide1} alt="Succulents" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide1} alt="Miniatures" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
