import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import s from './Product.module.scss';
import Header from '../../components/header/Header';
import Button from '../../components/ui/button/Button';
import SliderProduct from '../../components/sliderProduct/SliderProduct';
import Footer from '../../components/footer/Footer';
import SuccessModal from '../UserProfile/Component/SuccesModal/SuccessModal';
import UnsuccessModal from './modal/RemoveModal';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { fetchProduct } from '../../store/productsSlice';
import { getAddToCart, getChangeQuantity } from '../../store/cartSlice';
import madeCorrectOutputPrice from '../../utils/madeCorrectOutputPrice';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();
  const { productByID: prod, language } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    // to scroll into top of the page after transition
    window.scrollTo(0, 0);
  }, [productId]);

  const isCart = useAppSelector((state) => state.cart.cart);

  const idCartProduct = isCart.lineItems
    ? isCart.lineItems.find((item) => item.productId === productId)
    : undefined;

  const [modalState, setModalState] = useState({ type: '', isOpen: false });

  const closeModalAfterDelay = () => {
    setTimeout(() => {
      setModalState((prevState) => ({ ...prevState, isOpen: false }));
    }, 650);
  };

  const handleAddToCart = (cardId: string = '') => {
    dispatch(getAddToCart(cardId));
    setModalState({ type: 'success', isOpen: true });
    closeModalAfterDelay();
  };

  const handleRemoveFromCart = () => {
    if (idCartProduct) {
      dispatch(getChangeQuantity({ productId: idCartProduct.id, quantity: 0 }));
      setModalState({ type: 'unsuccess', isOpen: true });
      closeModalAfterDelay();
    }
  };

  const images = prod?.masterVariant.images || [];

  const price = prod?.masterVariant.prices![0].value.centAmount as number;
  const salePrice = prod?.masterVariant.prices![0].discounted?.value
    .centAmount as number;

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
                  {salePrice ? (
                    <div className={s.price__action}>
                      <span className={s.product__price_current}>
                        {madeCorrectOutputPrice(salePrice)}
                      </span>
                      <span className={s.product__price_old}>
                        {madeCorrectOutputPrice(price)}
                      </span>
                    </div>
                  ) : (
                    <span className={s.product__price_current}>
                      {madeCorrectOutputPrice(price)}
                    </span>
                  )}
                </div>
                <p className={s.product__descr}>
                  {prod?.description?.[language]}
                </p>
              </div>
              <div className={s.product__info_card}>
                {idCartProduct ? (
                  <Button
                    isFilled={true}
                    data-in-cart={!!idCartProduct}
                    isMain={true}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFromCart();
                    }}
                  >
                    Remove From Cart
                  </Button>
                ) : (
                  <Button
                    isFilled={true}
                    data-in-cart={!!idCartProduct}
                    isMain={true}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(productId);
                    }}
                  >
                    Add To Shopping Cart
                  </Button>
                )}
              </div>
              <SuccessModal
                isOpen={modalState.type === 'success' && modalState.isOpen}
              />
              <UnsuccessModal
                isOpen={modalState.type === 'unsuccess' && modalState.isOpen}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default ProductPage;
