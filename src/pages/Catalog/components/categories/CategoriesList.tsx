import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import useAppSelector from '../../../../hooks/useAppSelector';
import { fetchProductsByCategory } from '../../../../store/productsSlice';

import cl from './Categories.module.scss';

const CategoriesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categoriesList } = useAppSelector((state) => state.products);

  const handleCategory = ({
    categoryID,
    categoryName,
    parentCategoryName,
  }: {
    categoryID: string;
    categoryName: string;
    parentCategoryName?: string;
  }) => {
    dispatch(fetchProductsByCategory(categoryID));
    if (parentCategoryName) {
      navigate(`/catalog/${parentCategoryName}/${categoryName}`);
    } else {
      navigate(`/catalog/${categoryName}`);
    }
  };

  const renderSubCategories = (parentName: string) =>
    categoriesList
      .filter((cat) => cat.parent === parentName)
      .map((sub) => (
        <div
          key={sub.id}
          className="child"
          onClick={() =>
            handleCategory({
              categoryID: sub.id,
              categoryName: sub.name,
              parentCategoryName: parentName,
            })
          }
        >
          {sub.name}
        </div>
      ));

  const renderCategories = () =>
    categoriesList
      .filter((category) => category.parent === null)
      .map((cat) => (
        <div key={cat.id}>
          <div
            className="parent"
            onClick={() =>
              handleCategory({ categoryID: cat.id, categoryName: cat.name })
            }
          >
            {cat.name}
          </div>
          {renderSubCategories(cat.name)}
        </div>
      ));

  return <div className={cl.wrapper}>{renderCategories()}</div>;
};

export default CategoriesList;
