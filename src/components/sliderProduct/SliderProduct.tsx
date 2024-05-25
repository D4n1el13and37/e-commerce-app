import React, { useState } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Scrollbar } from 'swiper/modules';
import Fancybox from '../fancybox/Fancybox';

import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';
import 'swiper/scss/scrollbar';
import './SliderProduct.scss';

import slide1 from './1.jpg';

const SliderProduct: React.FC = () => {
  const [thumbsSwiper, setThumbSwiper] = useState<SwiperCore>();

  return (
    <>
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
          dragToClose: false,
          contentClick: 'iterateZoom',
          Images: {
            Panzoom: {
              maxScale: 1.5,
            },
          },
          animated: true,
          Thumbs: false,
          Toolbar: {
            display: {
              left: [],
              middle: [],
              right: ['close'],
            },
          },
        }}
      >
        <Swiper
          className="product__slider"
          modules={[FreeMode, Navigation, Thumbs]}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          navigation
          centeredSlides
          spaceBetween={15}
          a11y={{
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
          }}
        >
          <SwiperSlide data-fancybox="gallery" data-src={slide1}>
            <img src={slide1} alt="Slide 1" />
          </SwiperSlide>
          <SwiperSlide
            data-fancybox="gallery"
            data-src="https://www.thespruce.com/thmb/XGNizgeaP9z-1OTmJBKqOEjeYaQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/fire-lily-plant-profile-4768477_07-f7d5862d4cc940038cd9dc0ebcbe90fc.jpg"
          >
            <img
              src="https://www.thespruce.com/thmb/XGNizgeaP9z-1OTmJBKqOEjeYaQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/fire-lily-plant-profile-4768477_07-f7d5862d4cc940038cd9dc0ebcbe90fc.jpg"
              alt="Slide 2"
            />
          </SwiperSlide>
          <SwiperSlide
            data-fancybox="gallery"
            data-src="https://www.thespruce.com/thmb/_HoQplPyeUqmzsGCUJ1xBKxwHjg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/fire-lily-plant-profile-4768477_01-1bd7e7d311754a0a847430740d715acb.jpg"
          >
            <img
              src="https://www.thespruce.com/thmb/_HoQplPyeUqmzsGCUJ1xBKxwHjg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/fire-lily-plant-profile-4768477_01-1bd7e7d311754a0a847430740d715acb.jpg"
              alt="Slide 3"
            />
          </SwiperSlide>
          <SwiperSlide
            data-fancybox="gallery"
            data-src="https://www.thespruce.com/thmb/Ts7h2SpU5Dic_zqdOW5uUL_AFhQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1166217952-b04162b3e74047279ef6877ee213dd75.jpg"
          >
            <img
              src="https://www.thespruce.com/thmb/Ts7h2SpU5Dic_zqdOW5uUL_AFhQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1166217952-b04162b3e74047279ef6877ee213dd75.jpg"
              alt="Slide 4"
            />
          </SwiperSlide>
        </Swiper>
      </Fancybox>

      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs, Scrollbar]}
        className="product__thumb"
        onSwiper={setThumbSwiper}
        scrollbar={{
          hide: false,
          draggable: true,
          enabled: true,
          el: '.product__scrollbar',
        }}
        breakpoints={{
          320: {
            spaceBetween: 10,
            slidesPerView: 2,
          },
          700: {
            spaceBetween: 15,
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 'auto',
          },
          1024: {
            spaceBetween: 15,
            freeMode: false,
          },
          1175: {
            slidesPerView: 'auto',
          },
        }}
      >
        <SwiperSlide>
          <img src={slide1} alt="Thumbnail 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.thespruce.com/thmb/XGNizgeaP9z-1OTmJBKqOEjeYaQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/fire-lily-plant-profile-4768477_07-f7d5862d4cc940038cd9dc0ebcbe90fc.jpg"
            alt="Thumbnail 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.thespruce.com/thmb/_HoQplPyeUqmzsGCUJ1xBKxwHjg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/fire-lily-plant-profile-4768477_01-1bd7e7d311754a0a847430740d715acb.jpg"
            alt="Thumbnail 3"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.thespruce.com/thmb/Ts7h2SpU5Dic_zqdOW5uUL_AFhQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1166217952-b04162b3e74047279ef6877ee213dd75.jpg"
            alt="Thumbnail 4"
          />
        </SwiperSlide>
        <div className="product__wrapper">
          <div className="product__scrollbar swiper-scrollbar" />
        </div>
      </Swiper>
    </>
  );
};

export default SliderProduct;
