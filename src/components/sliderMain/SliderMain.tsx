import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Scrollbar } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/autoplay';
import './SliderMain.scss';

import slide1 from './1.png';
import slide2 from './2.png';
import slide3 from './3.png';
import slide4 from './4.png';

const SliderMain: React.FC = () => {
  const slidesData = [
    { src: slide1, descr: 'Flowering' },
    { src: slide2, descr: 'Foliage' },
    { src: slide3, descr: 'Succulents' },
    { src: slide4, descr: 'Trees' },
  ];

  return (
    <Swiper
      modules={[Pagination, Scrollbar, Autoplay]}
      direction={'vertical'}
      speed={1000}
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
          const slideDescr = slidesData[index].descr;
          return `<span class="${className}">${slideDescr}</span>`;
        },
      }}
      className="hero__slider"
      autoplay={{
        delay: 5000,
      }}
      a11y={{
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
      }}
      rewind={true}
      autoHeight={true}
    >
      {slidesData.map((slide, index) => (
        <SwiperSlide key={index}>
          <img src={slide.src} alt={slide.descr} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderMain;
