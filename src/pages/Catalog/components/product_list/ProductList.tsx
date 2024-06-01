import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../../../components/card/ProductCard';
import useAppSelector from '../../../../hooks/useAppSelector';
import { RootState } from '../../../../store/store';
import cl from './ProductList.module.scss';

const ProductList: React.FC = () => {
  const { productsList, language } = useAppSelector(
    (state: RootState) => state.products
  );

  return (
    <div className={cl.wrapper}>
      {productsList.map((product) => {
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
      })}
    </div>
  );
};
export default ProductList;
