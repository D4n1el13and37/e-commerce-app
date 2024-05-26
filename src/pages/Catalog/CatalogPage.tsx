import React, { useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk';
import ProductCard from '../../components/card/ProductCard';
import Header from '../../components/header/Header';
import { getProducts } from '../../api/products/productsMethods';

const CatalogPage: React.FC = () => {
  const [prods, setProds] = useState<Product[]>();
  useEffect(() => {
    const getCards = async () => {
      try {
        const res = await getProducts();
        setProds(res.results);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };
    getCards();
  }, []);
  const language = 'en-US';

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
          {prods?.map((card) => {
            const title = card.masterData.current.name[language];
            const description = card.masterData.current.description![language];
            const imageData = card.masterData.current.masterVariant.images![0];
            const price =
              card.masterData.current.masterVariant.prices![0].value.centAmount;

            return (
              <ProductCard
                key={card.id}
                title={title}
                description={description}
                frontImage={imageData}
                price={price}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};

export default CatalogPage;
