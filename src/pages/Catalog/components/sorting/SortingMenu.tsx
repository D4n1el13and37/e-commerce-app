import React, { useState, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import {
  SortingValue,
  FilterValue,
} from '../../../../api/products/productsMethods';
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
  currentFilters: FilterValue;
}

const SortingMenu: React.FC<SortingProps> = ({
  currentCategory,
  currentFilters,
}) => {
  const dispatch = useAppDispatch();

  const [sort, setSort] = useState<SortingValue>({
    sortBy: '',
    sortOrder: '',
    category: currentCategory,
    filters: currentFilters,
  });

  useEffect(() => {
    setSort((prevSort) => ({
      ...prevSort,
      category: currentCategory,
      filters: currentFilters,
    }));
  }, [currentCategory, currentFilters]);

  const handleSortingChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (!selectedOption) {
      return;
    }
    const [sortBy, sortOrder] = selectedOption.value.split(' ');

    const newSort = {
      sortBy: sortBy as 'name' | 'price' | '',
      sortOrder: sortOrder as 'asc' | 'desc' | '',
      category: currentCategory,
      filters: currentFilters,
    };

    setSort(newSort);

    dispatch(fetchProductsBySorting(newSort));
  };

  return (
    <Select
      onChange={handleSortingChange}
      options={sortingOptions}
      classNamePrefix="react-select"
      value={sortingOptions.find(
        (option) => option.value === `${sort.sortBy} ${sort.sortOrder}`
      )}
      placeholder="Select sorting"
    />
  );
};

export default SortingMenu;
