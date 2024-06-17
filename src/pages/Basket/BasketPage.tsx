import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BasketContent from './components/BasketContent/BasketContent';
// import BasketCard from './components/basketCard/BasketCard';
// import useAppSelector from '../../hooks/useAppSelector';
// import cl from './BasketPage.module.scss';
// import EmptyCart from './components/empty/EmptyCart';
// import madeCorrectOutputPrice from '../../utils/madeCorrectOutputPrice';
// import BasketContent from './components/BasketContent/BasketContent';

const BasketPage = () => (
  <>
    <Header />
    <main className="container grid">
      <BasketContent />
    </main>
    <Footer />
  </>
);

export default BasketPage;
