import React, { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import s from './Product.module.scss';
import Header from '../../components/header/Header';
import Button from '../../components/ui/button/Button';
import SliderProduct from '../../components/sliderProduct/SliderProduct';
import getProduct from '../../api/products/getProductMethods';
import Footer from '../../components/footer/Footer';

const ProductPage: React.FC = () => {
  const [prod, setProd] = useState<ProductProjection>();

  useEffect(() => {
    const getProd = async () => {
      try {
        const res = await getProduct('de89121f-c2b6-479f-b5aa-62d06bd60d2f');
        setProd(res);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };
    getProd();
  }, []);

  const language = 'en-US' as string;

  const images = prod?.masterVariant.images || [];

  const price = prod?.masterVariant.prices![0].value.centAmount as number;
  const salePrice = prod?.masterVariant.prices![0].discounted?.value
    .centAmount as number;

  const currentPrice = (price / 100).toFixed(2);
  const salePriceOutput = ((salePrice || +currentPrice) / 100)?.toFixed(2);

  return (
    <>
      <Header />
      <main className={s.main}>
        <section className={s.product}>
          <div className="container grid">
            <div className={s.product__left}>
              <SliderProduct images={images} />
            </div>
            <div className={s.product__right}>
              <div className={s.product__info_top}>
                <h1 className={s.product__name}>{prod?.name[language]}</h1>
                <div className={s.product__price}>
                  <div className={s.product__price_current}>
                    {salePriceOutput ? `${salePriceOutput} €` : ''}
                  </div>
                  <div className={s.product__price_old}>
                    {currentPrice ? `${currentPrice} €` : ''}
                  </div>
                </div>
                <p className={s.product__descr}>
                  {prod?.description?.[language]}
                </p>
              </div>
              <div className={s.product__info_card}>
                <Button isFilled={true}>Add To Shopping Cart</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default ProductPage;
