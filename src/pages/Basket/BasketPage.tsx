import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BasketCard from './components/basketCard/BasketCard';
import useAppSelector from '../../hooks/useAppSelector';
import cl from './BasketPage.module.scss';
import EmptyCart from './components/empty/EmptyCart';
import madeCorrectOutputPrice from '../../utils/madeCorrectOutputPrice';

const BasketPage = () => {
  const { cartItems, cart } = useAppSelector((state) => state.cart);
  const FULL_PRICE = madeCorrectOutputPrice(cart.totalPrice?.centAmount || 0);

  return (
    <>
      <Header />
      <main className="container grid">
        <h1 className={cl.main__title}>Shopping Bag</h1>
        <div className={cl.content__wrapper}>
          {cartItems.length ? (
            <div className={cl.card_list__wrapper}>
              {cartItems.map((card) => (
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
              ))}
              <>
                <div className={cl.full_price__wrapper}>
                  <span className={cl.full_price__wrapper_text}>Total</span>
                  <hr className={cl.full_price__wrapper_dash} />
                  <span className={cl.full_price__wrapper_text}>
                    {FULL_PRICE}
                  </span>
                </div>
              </>
            </div>
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
