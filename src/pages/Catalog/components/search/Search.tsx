import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { fetchSearchProducts } from '../../../../store/productsSlice';

import useAppDispatch from '../../../../hooks/useAppDispatch';

interface ProductOption {
  value: string;
  label: string;
}
const Search = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loadOptions = async (inputValue: string): Promise<ProductOption[]> => {
    if (!inputValue) {
      return [];
    }

    try {
      const action = await dispatch(fetchSearchProducts(inputValue));
      if (Array.isArray(action.payload)) {
        return action.payload;
      }
      return [];
    } catch (error) {
      return [];
    }
  };

  const handleChange = (selectedOption: ProductOption | null) => {
    if (selectedOption) {
      navigate(`/catalog/${selectedOption.value}`);
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      onChange={handleChange}
      placeholder="Search for a product..."
      isClearable
    />
  );
};

export default Search;
