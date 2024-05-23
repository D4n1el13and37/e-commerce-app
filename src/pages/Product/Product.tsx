import React from 'react';
// import cn from 'classnames';
import s from './Product.module.scss';
import Header from '../../components/header/Header';
import Button from '../../components/ui/button/Button';
import SliderProduct from '../../components/sliderProduct/SliderProduct';
// import Footer from '../../components/footer/Footer';

const Product: React.FC = () => (
  <>
    <Header />
    <main style={{ paddingTop: '48px', height: '10000px' }}>
      <section className={s.product}>
        <div className="container grid">
          <div className={s.product__left}>
            <SliderProduct />
          </div>
          <div className={s.product__right}>
            <div className={s.product__info_top}>
              <h1 className={s.product__name}>Philodendron</h1>
              <div className={s.product__price}>
                <div className={s.product__price_current}>39.99 €</div>
                <div className={s.product__price_old}>48.99 €</div>
              </div>
              <p className={s.product__descr}>
                The Philodendron genus contains hundreds of species of beautiful
                foliage plants. With their large, green, and glossy leaves, they
                are excellent for adding a bit of their native tropical flair to
                your home. These popular houseplants are known for their easy
                care.
              </p>
            </div>
            <div className={s.product__info_card}>
              <Button isFilled={true}>Add To Shopping Cart</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </>
);

export default Product;
