import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BasketContent from './components/BasketContent/BasketContent';

const BasketPage = () => (
  <>
    <Header />
    <main className="container">
      <BasketContent />
    </main>
    <Footer />
  </>
);

export default BasketPage;
