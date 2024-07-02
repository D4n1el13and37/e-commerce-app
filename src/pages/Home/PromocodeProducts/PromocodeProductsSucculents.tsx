import { useEffect } from 'react';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { fetchProductsByCategory } from '../../../store/productsSlice';
import ProductList from '../../Catalog/components/product_list/ProductList';
import PromocodeCard from './PromocodeCard';
import classes from './promocodeProducts.module.scss';
import useAppSelector from '../../../hooks/useAppSelector';

const PromocodeProductsSucculent = () => {
  const dispatch = useAppDispatch();
  const { categoriesList } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (categoriesList.length > 0) {
      const succulentCategory = categoriesList.find(
        (cat) => cat.name === 'Succulents'
      );
      if (succulentCategory) {
        const succulentId = succulentCategory.id;
        dispatch(fetchProductsByCategory(succulentId));
      }
    }
  }, [dispatch, categoriesList]);

  return (
    <div className="grid">
      <PromocodeCard
        name="10% Off Succulents!"
        text="Enhance your home with our easy-care succulents. Enjoy an extra 10% discount for a limited time!"
        promocode="SUCCULENT10"
      />
      <div className={classes.productList}>
        <ProductList initialLimit={3} infiniteScroll={false} />
      </div>
    </div>
  );
};

export default PromocodeProductsSucculent;
