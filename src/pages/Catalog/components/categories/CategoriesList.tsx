import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import cl from './Categories.module.scss';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import useAppSelector from '../../../../hooks/useAppSelector';
import { fetchProductsByCategory } from '../../../../store/productsSlice';

const CategoriesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categoriesList } = useAppSelector((state) => state.products);

  const { categoryName, subcategoryName } = useParams<{
    categoryName: string;
    subcategoryName?: string;
  }>();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (subcategoryName) {
      setActiveCategory(subcategoryName);
    } else if (categoryName) {
      setActiveCategory(categoryName);
    }
  }, [categoryName, subcategoryName]);

  const handleCategory = ({
    categoryID,
    categoryName: category,
    parentCategoryName,
  }: {
    categoryID: string;
    categoryName: string;
    parentCategoryName?: string;
  }) => {
    dispatch(fetchProductsByCategory(categoryID));
    setActiveCategory(category);
    if (parentCategoryName) {
      navigate(`/catalog/${parentCategoryName}/${category}`);
    } else {
      navigate(`/catalog/${category}`);
    }
  };

  const renderSubCategories = (parentName: string) =>
    categoriesList
      .filter((cat) => cat.parent === parentName)
      .map((sub) => (
        <div
          key={sub.id}
          className={cn(cl.child, { [cl.active]: activeCategory === sub.name })}
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
        <div key={cat.id} className={cl.parent__wrapper}>
          <div
            className={cn(cl.parent, {
              [cl.active]: activeCategory === cat.name,
            })}
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
