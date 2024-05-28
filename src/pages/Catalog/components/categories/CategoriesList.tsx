import React from 'react';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import useAppSelector from '../../../../hooks/useAppSelector';
import { fetchProductsByCategory } from '../../../../store/productsSlice';

import cl from './Categories.module.scss';

const CategoriesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoriesList } = useAppSelector((state) => state.products);

  const handleCategory = (categoryID: string) => {
    dispatch(fetchProductsByCategory(categoryID));
  };

  return (
    <div className={cl.wrapper}>
      {categoriesList.map((category) => (
        <div
          style={{ cursor: 'pointer', display: 'flex' }}
          key={category.id}
          onClick={() => handleCategory(category.id)}
        >
          {category.parent ? (
            <div>{`...${category.name.en}`}</div>
          ) : (
            <div>{category.name.en} </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoriesList;
