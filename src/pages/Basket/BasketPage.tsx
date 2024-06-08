// import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BasketCard from './components/BasketCard';

const BasketPage = () => (
  <>
    <Header />
    <main>
      <BasketCard />
      <BasketCard />
      <BasketCard />
    </main>
    <Footer />
  </>
);

export default BasketPage;
