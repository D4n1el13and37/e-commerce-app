import { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { SortingValue } from '../../../../api/products/productsMethods';
import { fetchProductsBySorting } from '../../../../store/productsSlice';
import useAppDispatch from '../../../../hooks/useAppDispatch';

const sortingOptions = [
  { value: 'price desc', label: 'Higher price' },
  { value: 'price asc', label: 'Lower price' },
  { value: 'name desc', label: 'Z-A' },
  { value: 'name asc', label: 'A-Z' },
];

const SortingMenu = () => {
  const dispatch = useAppDispatch();

  const [sort, setSort] = useState<SortingValue>({
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const handleSortingChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (!selectedOption) {
      return;
    }
    const [sortBy, sortOrder] = selectedOption.value.split(' ');

    const newSort = {
      sortBy: sortBy as 'name' | 'price',
      sortOrder: sortOrder as 'asc' | 'desc',
    };

    setSort(newSort);

    dispatch(fetchProductsBySorting(sort));
  };

  return <Select onChange={handleSortingChange} options={sortingOptions} />;
};

export default SortingMenu;
