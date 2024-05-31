import React, { useState } from 'react';
import Checkbox from '../../../../components/ui/checkbox/Checkbox';
import Button from '../../../../components/ui/button/Button';
import { fetchProductsByFilters } from '../../../../store/productsSlice';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { FilterValue } from '../../../../api/products/productsMethods';

const FilterSidbar = () => {
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState<FilterValue>({
    size: [],
    careLevel: [],
    lightRequirement: [],
  });
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFilters((actualFilters) => {
      const filterKey = name as keyof FilterValue;
      const newValues = checked
        ? [...actualFilters[filterKey], value]
        : actualFilters[filterKey].filter((v) => v !== value);

      return {
        ...actualFilters,
        [name]: newValues,
      };
    });
  };

  const handleApplyFilter = async () => {
    dispatch(fetchProductsByFilters(filters));
  };

  return (
    <div className="filter-sidebar">
      <h3>Filter</h3>
      <div>
        <form action="">
          <div>
            <h4>Size plants</h4>
            <Checkbox
              label="Small"
              name="size"
              value="s"
              onChange={handleFilterChange}
            />
            <Checkbox
              label="Medium"
              name="size"
              value="m"
              onChange={handleFilterChange}
            />
            <Checkbox
              label="Large"
              name="size"
              value="l"
              onChange={handleFilterChange}
            />
          </div>

          <div>
            <h4>Сare Level</h4>
            <Checkbox
              label="Easy"
              name="careLevel"
              value="e"
              onChange={handleFilterChange}
            />
            <Checkbox
              label="Medium"
              name="careLevel"
              value="m"
              onChange={handleFilterChange}
            />
            <Checkbox
              label="Hard"
              name="careLevel"
              value="h"
              onChange={handleFilterChange}
            />
          </div>

          <div>
            <h4>Light Requirement</h4>
            <Checkbox
              label="Full Sun"
              name="lightRequirement"
              value="full"
              onChange={handleFilterChange}
            />
            <Checkbox
              label="Partial Sun"
              name="lightRequirement"
              value="partial"
              onChange={handleFilterChange}
            />
            <Checkbox
              label="Shade"
              name="lightRequirement"
              value="shade"
              onChange={handleFilterChange}
            />
          </div>

          <Button type="button" onClick={handleApplyFilter} isMain={true}>
            {' '}
            Apply
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FilterSidbar;
