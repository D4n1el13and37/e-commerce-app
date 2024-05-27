import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Hero from '../../components/hero/Hero';

const Home: React.FC = () => (
  <>
    <Header />
    <main>
      <Hero />
    </main>
    <Footer />
  </>
);

export default Home;
