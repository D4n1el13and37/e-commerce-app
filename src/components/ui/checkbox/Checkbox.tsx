import React, { InputHTMLAttributes, useState } from 'react';
import classes from './Checkbox.module.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  const [isChecked, setIsChecked] = useState(!!props.checked);
  function handleChange() {
    setIsChecked(!isChecked);
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
        ></input>
        {label && <span>{label}</span>}
      </label>
    </>
  );
};

export default Checkbox;
