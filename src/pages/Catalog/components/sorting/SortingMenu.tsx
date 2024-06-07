import React, { useState, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import { FilterValue } from '../../../../api/products/productsMethods';
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

  const [selectedOption, setSelectedOption] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);

  useEffect(() => {
    setSelectedOption(null);
  }, [currentCategory, currentFilters]);

  const handleSortingChange = (
    option: SingleValue<{ value: string; label: string }>
  ) => {
    if (!option) {
      return;
    }
    const [sortBy, sortOrder] = option.value.split(' ');

    const newSort = {
      sortBy: sortBy as 'name' | 'price' | '',
      sortOrder: sortOrder as 'asc' | 'desc' | '',
      category: currentCategory,
      filters: currentFilters,
    };

    setSelectedOption(option);

    dispatch(fetchProductsBySorting(newSort));
  };

  return (
    <Select
      onChange={handleSortingChange}
      options={sortingOptions}
      classNamePrefix="react-select"
      value={selectedOption}
      placeholder="Select sorting"
    />
  );
};

export default SortingMenu;
