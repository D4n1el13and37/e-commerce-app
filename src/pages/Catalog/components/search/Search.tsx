import React from 'react';
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import {
  CustomProduct,
  fetchSearchProducts,
} from '../../../../store/productsSlice';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import './Search.scss';

interface ProductOption {
  value: string | undefined;
  label: string;
}

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loadOptions = async (inputValue: string): Promise<ProductOption[]> => {
    if (!inputValue) {
      return [];
    }

    try {
      const action = await dispatch(fetchSearchProducts(inputValue));
      if (Array.isArray(action.payload)) {
        return action.payload.map((product: CustomProduct) => ({
          value: product.id,
          label: product.title['en-US'],
        }));
      }
      return [];
    } catch (error) {
      return [];
    }
  };

  const handleChange = (selectedOption: ProductOption | null) => {
    if (selectedOption) {
      navigate(`product/${selectedOption.value}`);
    }
  };

  return (
    <search className="search">
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        placeholder="Search for a product..."
        isClearable
        classNamePrefix="react-select"
        noOptionsMessage={() => 'Enter plant name'}
      />
    </search>
  );
};

export default Search;
