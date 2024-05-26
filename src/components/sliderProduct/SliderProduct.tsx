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

interface Image {
  url: string;
  label?: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface SliderProd {
  images: Image[];
}

const SliderProduct: React.FC<SliderProd> = ({ images }) => {
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
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              data-fancybox="gallery"
              data-src={image.url}
            >
              <img src={image.url} alt={image.label} />
            </SwiperSlide>
          ))}
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
            slidesPerView: 3,
            spaceBetween: 15,
            freeMode: false,
          },
          1170: {
            slidesPerView: 'auto',
          },
          1360: {
            slidesPerView: 3,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.url} alt={image.label} />
          </SwiperSlide>
        ))}
        <div className="product__wrapper">
          <div className="product__scrollbar swiper-scrollbar" />
        </div>
      </Swiper>
    </>
  );
};

export default SliderProduct;
