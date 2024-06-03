import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import cl from './Categories.module.scss';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import useAppSelector from '../../../../hooks/useAppSelector';
import { fetchProductsByCategory } from '../../../../store/productsSlice';
import Button from '../../../../components/ui/button/Button';

const CategoriesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categoriesList } = useAppSelector((state) => state.products);

  const { categoryName, subcategoryName } = useParams<{
    categoryName: string;
    subcategoryName?: string;
  }>();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
    if (modalOpen) {
      setModalOpen(false);
    }
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

  // const toggleMenuOpen = () => {
  //   setModalOpen(!modalOpen);
  // };

  return (
    <>
      <div className={cl.button__wrapper}>
        <Button isMain={true} /* onClick={toggleMenuOpen} */>
          Show Categories
        </Button>
      </div>
      <div className={cl.wrapper}>{renderCategories()}</div>
      {/* {modalOpen && (
        <div className={cn(cl.modal, cl.burger, { [cl.active]: modalOpen })}>
          <div className={cl.modal_content}>
            <Button isMain={true} onClick={toggleMenuOpen}>
              Back
            </Button>
            {renderCategories()}
          </div>
        </div>
      )} */}
    </>
  );
};

export default CategoriesList;
