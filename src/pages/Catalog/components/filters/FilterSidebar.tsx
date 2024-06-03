import { useLocation } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import Checkbox from '../../../../components/ui/checkbox/Checkbox';
import Button from '../../../../components/ui/button/Button';
import { fetchProductsByFilters } from '../../../../store/productsSlice';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { FilterValue } from '../../../../api/products/productsMethods';

import classes from './FilterSidebar.module.scss';
import useAppSelector from '../../../../hooks/useAppSelector';
import { setFilters, resetFilters } from '../../../../store/filterSlice';

interface FilterSidebarProps {
  currentCategory?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ currentCategory }) => {
  const dispatch = useAppDispatch();
  const currentFilters = useAppSelector((state) => state.filters.filters);
  const [filters, setLocalFilters] = useState<FilterValue>(currentFilters);
  const location = useLocation();

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setLocalFilters((actualFilters) => {
      const filterKey = name as keyof FilterValue;
      const currentValues = Array.isArray(actualFilters[filterKey])
        ? (actualFilters[filterKey] as string[])
        : [];
      const newValues = checked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);

      return {
        ...actualFilters,
        [filterKey]: newValues,
      };
    });
  };

  const handleApplyFilter = async () => {
    dispatch(setFilters(filters));
    dispatch(fetchProductsByFilters({ ...filters, category: currentCategory }));
  };

  const handleResetFilters = useCallback(async () => {
    dispatch(resetFilters());
    dispatch(
      fetchProductsByFilters({
        size: [],
        careLevel: [],
        lightRequirement: [],
        category: currentCategory,
      })
    );
    setLocalFilters({
      size: [],
      careLevel: [],
      lightRequirement: [],
    });
  }, [dispatch, currentCategory]);

  useEffect(() => {
    handleResetFilters();
  }, [location.pathname, handleResetFilters]);

  return (
    <div className={classes.filterSidebar}>
      {/* <h3>Filter</h3> */}
      <div>
        <form action="">
          <div className={classes.filterSidebar__sortBox}>
            <h4 className={classes.filterSidebar__name}>Size plants</h4>
            <Checkbox
              label="Small"
              name="size"
              value="s"
              onChange={handleFilterChange}
              checked={filters.size.includes('s')}
            />
            <Checkbox
              label="Medium"
              name="size"
              value="m"
              onChange={handleFilterChange}
              checked={filters.size.includes('m')}
            />
            <Checkbox
              label="Large"
              name="size"
              value="l"
              onChange={handleFilterChange}
              checked={filters.size.includes('l')}
            />
          </div>

          <div className={classes.filterSidebar__sortBox}>
            <h4 className={classes.filterSidebar__name}>Сare Level</h4>
            <Checkbox
              label="Easy"
              name="careLevel"
              value="e"
              onChange={handleFilterChange}
              checked={filters.careLevel.includes('e')}
            />
            <Checkbox
              label="Medium"
              name="careLevel"
              value="m"
              onChange={handleFilterChange}
              checked={filters.careLevel.includes('m')}
            />
            <Checkbox
              label="Hard"
              name="careLevel"
              value="h"
              onChange={handleFilterChange}
              checked={filters.careLevel.includes('h')}
            />
          </div>

          <div className={classes.filterSidebar__sortBox}>
            <h4 className={classes.filterSidebar__name}>Light Requirement</h4>
            <Checkbox
              label="Full Sun"
              name="lightRequirement"
              value="full"
              onChange={handleFilterChange}
              checked={filters.lightRequirement.includes('full')}
            />
            <Checkbox
              label="Partial Sun"
              name="lightRequirement"
              value="partial"
              onChange={handleFilterChange}
              checked={filters.lightRequirement.includes('partial')}
            />
            <Checkbox
              label="Shade"
              name="lightRequirement"
              value="shade"
              onChange={handleFilterChange}
              checked={filters.lightRequirement.includes('shade')}
            />
          </div>

          <div className={classes.buttonBox}>
            <Button
              type="button"
              onClick={handleApplyFilter}
              isMain={true}
              isFilled={true}
            >
              Apply
            </Button>
            <Button type="button" onClick={handleResetFilters} isMain={true}>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterSidebar;
