import React, { useState } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';
import './SliderProduct.scss';

import slide1 from './1.jpg';

const SliderProduct: React.FC = () => {
  const [thumbsSwiper, setThumbSwiper] = useState<SwiperCore>();

  return (
    <>
      <Swiper
        className="product__slider"
        modules={[FreeMode, Navigation, Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        navigation
        // height={576}
        centeredSlides
        a11y={{
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        }}
      >
        <SwiperSlide>
          <img src={slide1} alt="#" />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.thespruce.com/thmb/XGNizgeaP9z-1OTmJBKqOEjeYaQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/fire-lily-plant-profile-4768477_07-f7d5862d4cc940038cd9dc0ebcbe90fc.jpg"
            alt="#"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.thespruce.com/thmb/_HoQplPyeUqmzsGCUJ1xBKxwHjg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/fire-lily-plant-profile-4768477_01-1bd7e7d311754a0a847430740d715acb.jpg"
            alt="#"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.thespruce.com/thmb/Ts7h2SpU5Dic_zqdOW5uUL_AFhQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1166217952-b04162b3e74047279ef6877ee213dd75.jpg"
            alt="#"
          />
        </SwiperSlide>
      </Swiper>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="product__thumb"
        onSwiper={setThumbSwiper}
      >
        <SwiperSlide>
          <img src={slide1} alt="#" />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.thespruce.com/thmb/XGNizgeaP9z-1OTmJBKqOEjeYaQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/fire-lily-plant-profile-4768477_07-f7d5862d4cc940038cd9dc0ebcbe90fc.jpg"
            alt="#"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.thespruce.com/thmb/_HoQplPyeUqmzsGCUJ1xBKxwHjg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/fire-lily-plant-profile-4768477_01-1bd7e7d311754a0a847430740d715acb.jpg"
            alt="#"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.thespruce.com/thmb/Ts7h2SpU5Dic_zqdOW5uUL_AFhQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1166217952-b04162b3e74047279ef6877ee213dd75.jpg"
            alt="#"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SliderProduct;
