import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { SortingValue } from '../../../../api/products/productsMethods';
import { fetchProductsBySorting } from '../../../../store/productsSlice';
import useAppDispatch from '../../../../hooks/useAppDispatch';

const sortingOptions = [
  { value: 'price desc', label: 'Highest Price' },
  { value: 'price asc', label: 'Lowest Price' },
  { value: 'name desc', label: 'Name: Z-A' },
  { value: 'name asc', label: 'Name: A-Z' },
];

interface SortingProps {
  currentCategory?: string;
}

const SortingMenu: React.FC<SortingProps> = ({ currentCategory }) => {
  const dispatch = useAppDispatch();

  const [sort, setSort] = useState<SortingValue>({
    sortBy: 'name',
    sortOrder: 'asc',
    category: currentCategory,
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
      category: currentCategory,
    };

    setSort(sort);

    dispatch(fetchProductsBySorting(newSort));
  };

  return (
    <Select
      onChange={handleSortingChange}
      options={sortingOptions}
      classNamePrefix="react-select"
    />
  );
};

export default SortingMenu;
