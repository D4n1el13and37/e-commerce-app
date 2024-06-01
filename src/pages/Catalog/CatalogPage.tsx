import React, { useEffect } from 'react';
import cn from 'classnames';
import Header from '../../components/header/Header';
import useAppDispatch from '../../hooks/useAppDispatch';
import { RootState } from '../../store/store';
import { fetchProducts, fetchCategories } from '../../store/productsSlice';
import useAppSelector from '../../hooks/useAppSelector';
import CategoriesList from './components/categories/CategoriesList';
import ProductList from './components/product_list/ProductList';
import FilterSidebar from './components/filters/FilterSidebar';
import Footer from '../../components/footer/Footer';

import cl from './CatalogPage.module.scss';
import SortingMenu from './components/sorting/SortingMenu';
import Search from './components/search/Search';

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
      <Search />

      <SortingMenu />

      <main className={cn(cl.catalog__wrapper, 'container', 'grid')}>
        <div>
          <CategoriesList />
          <FilterSidebar />
        </div>
        <ProductList products={productsList} language={language} />
      </main>
      <Footer />
    </>
  );
};

export default CatalogPage;
