import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
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
import Footer from '../../components/footer/Footer';
import Breadcrumbs from '../../components/ui/crumbs/BreadCrumbs';
import useAppSelector from '../../hooks/useAppSelector';
import FilterSidebar from './components/filters/FilterSidebar';
import SortingMenu from './components/sorting/SortingMenu';
import Search from './components/search/Search';
import Button from '../../components/ui/button/Button';
import { RootState } from '../../store/store';
import Loader from '../../components/laoder/Loader';

const CatalogPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryName, subcategoryName } = useParams<{
    categoryName: string;
    subcategoryName?: string;
  }>();
  const { categoriesList } = useAppSelector((state) => state.products);

  const isLoading = useSelector((state: RootState) => state.products.isLoading);

  const isLoadingCart = useSelector((state: RootState) => state.cart.isLoading);

  const currentFilters = useSelector(
    (state: RootState) => state.filters.filters
  );

  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarActive(!isSidebarActive);
  }, [isSidebarActive]);

  const closeSidebar = useCallback(() => {
    setIsSidebarActive(false);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth > 900) {
      setIsSidebarActive(false);
    }
  }, []);

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.classList.toggle('stop-scroll', isSidebarActive);

    const resizeListener = handleResize;
    window.addEventListener('resize', resizeListener);

    return () => {
      body.classList.remove('stop-scroll');
      window.removeEventListener('resize', resizeListener);
    };
  }, [isSidebarActive, handleResize]);

  // load category list if we don't have it on state
  useEffect(() => {
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

  const currentCategory = categoriesList.find(
    (cat) => cat.name === (subcategoryName || categoryName)
  )?.id;

  return (
    <>
      <Header />
      {(isLoading || isLoadingCart) && <Loader />}
      <main className={cn(cl.catalog__main)}>
        <div className={cn(cl.catalog__wrapper, 'container', 'grid')}>
          <Breadcrumbs />
          <Search />
          <div className={cl.catalog__sorting}>
            <SortingMenu
              currentCategory={currentCategory}
              currentFilters={currentFilters}
            />
          </div>
          <div className={cl.button__wrapper}>
            <Button
              isMain={true}
              isFilled={true}
              onClick={toggleSidebar}
              aria-label="Open filters menu"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m14 24a1 1 0 0 1 -.6-.2l-4-3a1 1 0 0 1 -.4-.8v-5.62l-7.016-7.893a3.9 3.9 0 0 1 2.916-6.487h14.2a3.9 3.9 0 0 1 2.913 6.488l-7.013 7.892v8.62a1 1 0 0 1 -1 1zm-3-4.5 2 1.5v-7a1 1 0 0 1 .253-.664l7.268-8.177a1.9 1.9 0 0 0 -1.421-3.159h-14.2a1.9 1.9 0 0 0 -1.421 3.158l7.269 8.178a1 1 0 0 1 .252.664z" />
              </svg>
            </Button>
          </div>
          <div
            className={cn(cl.catalog__sidebar, {
              [cl.catalog__sidebar_active]: isSidebarActive,
            })}
          >
            <div className={cl.button__close}>
              <Button
                isMain={true}
                isFilled={true}
                onClick={toggleSidebar}
                aria-label="Close filters menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z" />
                </svg>
              </Button>
            </div>
            <CategoriesList />
            <FilterSidebar
              currentCategory={currentCategory}
              closeSidebar={closeSidebar}
            />
          </div>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CatalogPage;
