import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import cn from 'classnames';
import cl from './CatalogPage.module.scss';
import Header from '../../components/header/Header';
import useAppDispatch from '../../hooks/useAppDispatch';
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
} from '../../store/productsSlice';
import CategoriesList from './components/categories/CategoriesList';
// import ProductList from './components/product_list/ProductList';
import Footer from '../../components/footer/Footer';
import Breadcrumbs from '../../components/ui/crumbs/BreadCrumbs';
import useAppSelector from '../../hooks/useAppSelector';

const CatalogPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryName, subcategoryName } = useParams<{
    categoryName: string;
    subcategoryName?: string;
  }>();
  const { categoriesList } = useAppSelector((state) => state.products);

  useEffect(() => {
    // load category list if we don't have it on state
    if (categoriesList.length === 0) {
      dispatch(fetchCategories());
    }

    // Choose category for upload products
    const categoryToLoad = subcategoryName || categoryName;
    if (categoryToLoad) {
      const category = categoriesList.find(
        (cat) => cat.name === categoryToLoad
      );
      if (category) {
        dispatch(fetchProductsByCategory(category.id));
      }
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, categoryName, subcategoryName, categoriesList]);

  return (
    <>
      <Header />
      <main className={cn(cl.main_catalog)}>
        <div className="container grid">
          <Breadcrumbs />
          <CategoriesList />
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CatalogPage;
