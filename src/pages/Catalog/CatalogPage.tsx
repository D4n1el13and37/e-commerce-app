import React, { useEffect } from 'react';
import cn from 'classnames';
import Header from '../../components/header/Header';
import useAppDispatch from '../../hooks/useAppDispatch';
import { RootState } from '../../store/store';
import { fetchProducts, fetchCategories } from '../../store/productsSlice';
import useAppSelector from '../../hooks/useAppSelector';
import CategoriesList from './components/categories/CategoriesList';
import ProductList from './components/product_list/ProductList';
import Footer from '../../components/footer/Footer';

import cl from './CatalogPage.module.scss';

const CatalogPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productsList, language } = useAppSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className={cn(cl.catalog__wrapper, 'container', 'grid')}>
        <CategoriesList />
        <ProductList products={productsList} language={language} />
      </main>
      <Footer />
    </>
  );
};

export default CatalogPage;
