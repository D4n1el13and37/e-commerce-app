import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Hero from '../../components/hero/Hero';
import PromocodeProductsSucculent from './PromocodeProducts/PromocodeProductsSucculents';
import BannerHome from './PromocodeProducts/BannerHome';

import classes from './PromocodeProducts/promocodeProducts.module.scss';
import SmallBanner from './PromocodeProducts/SmallBaner';

const Home: React.FC = () => (
  <>
    <Header />
    <main>
      <Hero />
      <div className="container">
        <div className={classes.wrapperSmallBanner}>
          <SmallBanner
            imgPath="https://www.thespruce.com/thmb/GlAW0Eo6RSBVkyPmT60fvPQHDro=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/grow-kumquats-indoors-1902442-01-81c9f69139684871855bb117f2b8e662.jpg"
            title="Kumquat"
            text="Bring home the sunshine with tangy fruits and lush greenery!"
            link="/catalog/product/6c041d96-4b15-4c4a-a89c-4799c3e37e3b"
          />

          <SmallBanner
            imgPath="     https://www.thespruce.com/thmb/NlUPRFLF444OXKmfxFPRDHyqeI0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/basic-indoor-orchid-care-1902822-04-7d58691d8e7a40b78e74f69f5b40948f.jpg"
            title="Orchids"
            text="Elevate your space with elegant blooms and timeless beauty!"
            link="/catalog/product/2ddb86c8-ad86-4ae1-9a70-73aa7dc08236"
          />
        </div>

        <div className={classes.wrapper}>
          <PromocodeProductsSucculent />
          <BannerHome
            header="Exclusive Savings Await!"
            subheader="Get a discount of 10 € off 100 €"
            text="Transform your home with our beautiful plants and save more today!"
            promocode="SHOPPINGCART10"
          />
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Home;
