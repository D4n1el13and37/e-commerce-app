import React from 'react';
import ProductCard from '../../../../components/card/ProductCard';
import useAppSelector from '../../../../hooks/useAppSelector';
import { RootState } from '../../../../store/store';
import cl from './ProductList.module.scss';
import ProductNotFound from '../product_NotFound/ProductNotFound';

const ProductList: React.FC = () => {
  const { productsList, language } = useAppSelector(
    (state: RootState) => state.products
  );

  return (
    <div className={cl.wrapper}>
      {productsList.length > 0 ? (
        productsList.map((product) => {
          const title = product.title[language];
          const description = product.description![language];
          const imageData = product.images![0];
          const { price, salePrice, id } = product;
          const linkPath = `/catalog/product/${id}`;

          return (
            <ProductCard
              key={id}
              title={title}
              description={description}
              frontImage={imageData}
              price={price}
              salePrice={salePrice}
              linkPath={linkPath}
            />
          );
        })
      ) : (
        <div>
          <ProductNotFound />
        </div>
      )}
    </div>
  );
};

export default ProductList;
