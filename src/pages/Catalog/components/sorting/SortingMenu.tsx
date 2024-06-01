import React, { useState } from 'react';
import Select from 'react-select';
import { SortingValue } from '../../../../api/products/productsMethods';
import { fetchProductsBySorting } from '../../../../store/productsSlice';
import useAppDispatch from '../../../../hooks/useAppDispatch';

const sortingOptions = [
  { value: 'price desc', label: 'Lower price' },
  { value: 'price asc', label: 'Higher price' },
  { value: 'name desc', label: 'A-Z' },
  { value: 'name asc', label: 'Z-A' },
];

const SortingMenu = () => {
  const dispatch = useAppDispatch();

  const [sort, setSort] = useState<SortingValue>({
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const handleSortingChange = (e) => {
    const value = e.value.split(' ');
    // console.log('change sorting', value);

    setSort({
      sortBy: value[0],
      sortOrder: value[1],
    });
    // console.log('change sorting', sort);

    dispatch(fetchProductsBySorting(sort));
  };

  return <Select onChange={handleSortingChange} options={sortingOptions} />;
};

export default SortingMenu;
