import React, { InputHTMLAttributes, useState } from 'react';
import classes from './Checkbox.module.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isChecked?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, ...props }) => {
  const [checkboxState, setCheckboxState] = useState(!!isChecked);
  function handleChange() {
    setCheckboxState(!checkboxState);
  }

  return (
    <>
      <label
        data-testid="checkbox-label"
        className={`${classes.checkbox_wrappper}`}
      >
        <input
          className={`${classes.input}`}
          type="checkbox"
          data-testid="checkbox"
          onChange={handleChange}
          checked={checkboxState}
          {...props}
        ></input>
        {label && <span>{label}</span>}
      </label>
    </>
  );
};

export default Checkbox;
