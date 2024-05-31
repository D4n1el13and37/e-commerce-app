import { useState } from 'react';
import Checkbox from '../../../../components/ui/checkbox/Checkbox';
import Button from '../../../../components/ui/button/Button';

const FilterSidbar = () => {
  const [filters, setFilters] = useState({
    size: '',
    careLevel: '',
    lightRequirement: '',
    priceRange: [0, 10000], // примерный диапазон цен
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
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
              name="small"
              value="s"
              onChange={handleFilterChange}
            />
            <Checkbox
              label="Medium"
              name="medium"
              value="m"
              onChange={handleFilterChange}
            />
            <Checkbox
              label="Large"
              name="large"
              value="l"
              onChange={handleFilterChange}
            />
          </div>

          <div>
            <h4>Сare Level</h4>
            <Checkbox
              label="Easy"
              name="easy"
              value="e"
              onChange={handleFilterChange}
            />
            <Checkbox
              label="Medium"
              name="medium"
              value="m"
              onChange={handleFilterChange}
            />
            <Checkbox
              label="Hard"
              name="hard"
              value="h"
              onChange={handleFilterChange}
            />
          </div>

          <div>
            <h4>Light Requirement</h4>
            <Checkbox
              label="Full Sun"
              name="full"
              value="full"
              onChange={handleFilterChange}
            />
            <Checkbox
              label="Partial Sun"
              name="partial"
              value="partial"
              onChange={handleFilterChange}
            />
            <Checkbox
              label="Shade"
              name="shade"
              value="shade"
              onChange={handleFilterChange}
            />
          </div>

          <div>
            <h4>Price</h4>
          </div>

          <Button>Apply filter</Button>
        </form>
      </div>
    </div>
  );
};

export default FilterSidbar;
