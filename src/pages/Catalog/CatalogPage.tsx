import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/card/ProductCard';
import Header from '../../components/header/Header';
import useAppDispatch from '../../hooks/useAppDispatch';
import { RootState } from '../../store/store';
import { fetchProducts } from '../../store/productsSlice';
import useAppSelector from '../../hooks/useAppSelector';

import classes from './CatalogPage.module.scss';

const CatalogPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productsList, language } = useAppSelector(
    (state: RootState) => state.products
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <div className={classes.cards__wrapper}>
          {productsList.map((product) => {
            const title = product.masterData.current.name[language];
            const description =
              product.masterData.current.description![language];
            const imageData =
              product.masterData.current.masterVariant.images![0];
            const price =
              product.masterData.current.masterVariant.prices![0].value
                .centAmount;
            const salePrice =
              product.masterData.current.masterVariant.prices![0]?.discounted
                ?.value.centAmount;

            return (
              <ProductCard
                key={product.id}
                title={title}
                description={description}
                frontImage={imageData}
                price={price}
                salePrice={salePrice}
                toProductPage={() => navigate(`/catalog/${product.id}`)}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};

export default CatalogPage;
