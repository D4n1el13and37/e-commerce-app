import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BasketCard from './components/basketCard/BasketCard';
import useAppSelector from '../../hooks/useAppSelector';

import cl from './BasketPage.module.scss';
import EmptyCart from './components/empty/EmptyCart';

const BasketPage = () => {
  const currentCartItems = useAppSelector((state) => state.cart.cartItems);

  return (
    <>
      <Header />
      <main className="container grid">
        <h1 className={cl.main__title}>Shopping Bag</h1>
        <div className={cl.content__wrapper}>
          {currentCartItems.length ? (
            currentCartItems.map((card) => (
              <BasketCard
                key={card.id}
                id={card.id}
                productId={card.productId}
                name={card.name['en-US']}
                price={card.price}
                image={card.variant.images!}
                attributes={card.variant.attributes!}
                quantity={card.quantity}
              />
            ))
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
