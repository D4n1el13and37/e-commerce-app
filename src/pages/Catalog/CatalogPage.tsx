import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/card/ProductCard';
import Header from '../../components/header/Header';
import useAppDispatch from '../../hooks/useAppDispatch';
import { RootState } from '../../store/store';
import { fetchProducts } from '../../store/productsSlice';
import useAppSelector from '../../hooks/useAppSelector';

const CatalogPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productsList } = useAppSelector((state: RootState) => state.products);
  const language = 'en-US';

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <div
          className="catalog list"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            padding: '40px 0',
            justifyContent: 'center',
          }}
        >
          {productsList.map((productCard) => {
            const title = productCard.masterData.current.name[language];
            const description =
              productCard.masterData.current.description![language];
            const imageData =
              productCard.masterData.current.masterVariant.images![0];
            const price =
              productCard.masterData.current.masterVariant.prices![0].value
                .centAmount;
            const salePrice =
              productCard.masterData.current.masterVariant.prices![0]
                ?.discounted?.value.centAmount;

            return (
              <Link to={`/catalog/${productCard.id}`} key={productCard.id}>
                <ProductCard
                  key={productCard.id}
                  title={title}
                  description={description}
                  frontImage={imageData}
                  price={price}
                  salePrice={salePrice}
                />
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default CatalogPage;
