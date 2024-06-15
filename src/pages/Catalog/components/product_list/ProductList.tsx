import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../../../components/card/ProductCard';
import useAppSelector from '../../../../hooks/useAppSelector';
import { RootState } from '../../../../store/store';
import cl from './ProductList.module.scss';
import ProductNotFound from '../product_NotFound/ProductNotFound';

interface ProductListProps {
  limit?: number;
}

const ProductList: React.FC<ProductListProps> = ({ limit = 20 }) => {
  const { productsList, language } = useAppSelector(
    (state: RootState) => state.products
  );

  const displayedProducts = productsList.slice(0, limit); // отображение только 3 продуктов

  return (
    <div className={cl.wrapper}>
      {displayedProducts.length > 0 ? (
        displayedProducts.map((product) => {
          const title = product.title[language];
          const description = product.description![language];
          const imageData = product.images![0];
          const { price, salePrice, id } = product;
          const linkPath = `/catalog/product/${id}`;

          return (
            <Link to={linkPath} key={id}>
              <ProductCard
                key={id}
                title={title}
                description={description}
                frontImage={imageData}
                price={price}
                salePrice={salePrice}
              />
            </Link>
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
