import React, { InputHTMLAttributes, useState } from 'react';
import classes from './Checkbox.module.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isDisabled?: boolean;
  isChecked?: boolean;
  isRequred?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ ...props }) => {
  const [isChecked, setIsChecked] = useState(!!props.isChecked);
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
          checked={isChecked}
          onChange={handleChange}
          required={!!props.isRequred}
          disabled={!!props.isDisabled}
        ></input>
        {props.label && <span>{props.label}</span>}
      </label>
    </>
  );
};

export default Checkbox;
