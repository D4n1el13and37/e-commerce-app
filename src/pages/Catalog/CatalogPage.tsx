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
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}
        >
          {prods?.map((card, index) => (
            <ProductCard
              key={index + card.masterData.current.name[language]}
              title={card.masterData.current.name[language]}
              description={card.masterData.current.description![language]}
              frontImage={card.masterData.current.masterVariant.images![0]}
              price={
                card.masterData.current.masterVariant.prices![0].value
                  .centAmount
              }
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default CatalogPage;
