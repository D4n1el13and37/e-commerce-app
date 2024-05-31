import React from 'react';
import { Link } from 'react-router-dom';
import { CustomProduct } from '../../../../store/productsSlice';
import ProductCard from '../../../../components/card/ProductCard';

import cl from './ProductList.module.scss';

interface ProductListProps {
  products: CustomProduct[];
  language: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, language }) => (
  <div className={cl.wrapper}>
    {products.map((product) => {
      const title = product.title[language];
      const description = product.description![language];
      const imageData = product.images![0];
      const { price, salePrice, id } = product;

      return (
        <Link to={`/catalog/${id}`} key={id}>
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
export default ProductList;
