import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BasketCard from './components/basketCard/BasketCard';
import useAppSelector from '../../hooks/useAppSelector';

const BasketPage = () => {
  const currentCartItems = useAppSelector((state) => state.cart.cartItems);

  return (
    <>
      <Header />
      {/* <main className="container"> */}
      <main>
        {currentCartItems.map((card) => (
          <BasketCard
            key={card.id}
            id={card.id}
            productId={card.productId}
            name={card.name['en-US']}
            price={card.price}
            image={card.variant.images!}
            attributes={card.variant.attributes!}
            quantity={card.quantity}
            totalPrice={card.totalPrice.centAmount}
          />
        ))}
      </main>
      <Footer />
    </>
  );
};

export default BasketPage;
