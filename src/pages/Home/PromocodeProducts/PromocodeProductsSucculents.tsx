import useAppDispatch from '../../../hooks/useAppDispatch';
import { fetchProductsByCategory } from '../../../store/productsSlice';
import ProductList from '../../Catalog/components/product_list/ProductList';
import PromocodeCard from './PromocodeCard';
import classes from './promocodeProducts.module.scss';

const PromocodeProductsSucculent = () => {
  const dispatch = useAppDispatch();

  const categoryIdSucculent = '17bea79f-f832-4725-bb7a-ac7f801c3a45';

  const preloadProducts = () =>
    dispatch(fetchProductsByCategory(categoryIdSucculent));

  preloadProducts();

  return (
    <div className="grid">
      <PromocodeCard
        name="10% Off Succulents!"
        text="Enhance your home with our easy-care succulents. Enjoy an extra 10% discount for a limited time!"
        promocode="SUCCULENTSALE10"
      />
      <div className={classes.productList}>
        {' '}
        <ProductList limit={3} />
      </div>
    </div>
  );
};

export default PromocodeProductsSucculent;
