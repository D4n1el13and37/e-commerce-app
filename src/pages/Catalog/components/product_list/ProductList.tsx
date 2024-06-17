import React, { useEffect, useState } from 'react';
import ProductCard from '../../../../components/card/ProductCard';
import useAppSelector from '../../../../hooks/useAppSelector';
import { RootState } from '../../../../store/store';
import cl from './ProductList.module.scss';
import ProductNotFound from '../product_NotFound/ProductNotFound';

interface ProductListProps {
  initialLimit?: number;
  infiniteScroll?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  initialLimit = 9,
  infiniteScroll = true,
}) => {
  const { productsList, language } = useAppSelector(
    (state: RootState) => state.products
  );

  const [displayedProducts, setDisplayedProducts] = useState(
    productsList.slice(0, initialLimit)
  );
  const [limit, setLimit] = useState(initialLimit);

  const handleScroll = (e: Event) => {
    const target = e.target as Document;

    if (
      target.documentElement.scrollHeight -
        (target.documentElement.scrollTop + window.innerHeight) <
      525
    ) {
      setLimit((prevLimit) => prevLimit + 9);
    }
  };

  useEffect(() => {
    setDisplayedProducts(productsList.slice(0, limit));
  }, [limit, productsList]);

  useEffect(() => {
    const onScroll = (e: Event) => handleScroll(e);

    if (infiniteScroll) {
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }

    return () => {};
  }, [infiniteScroll]);

  useEffect(() => {
    setLimit(initialLimit);
    setDisplayedProducts(productsList.slice(0, initialLimit));
  }, [initialLimit, productsList]);

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
            <ProductCard
              key={id}
              title={title}
              description={description}
              frontImage={imageData}
              price={price}
              salePrice={salePrice}
              linkPath={linkPath}
              id={id}
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
