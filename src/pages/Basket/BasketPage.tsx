import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BasketCard from './components/BasketCard';

import cl from './BasketPage.module.scss';
import EmptyCart from './components/empty/EmptyCart';

const BasketPage = () => {
  const mockArray = [];
  return (
    <>
      <Header />
      <main className="container">
        <div className={cl.main__wrapper}>
          <h1 className={cl.main__title}>Shopping Bag</h1>

          {/* mock checker if cart is empty */}
          {mockArray.length ? (
            <>
              <BasketCard />
              <BasketCard />
              <BasketCard />
            </>
          ) : (
            <EmptyCart />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BasketPage;
