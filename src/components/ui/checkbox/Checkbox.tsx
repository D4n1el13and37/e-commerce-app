import { useState } from 'react';
import classes from './Checkbox.module.scss';

interface CheckboxInterface {
  label?: string;
  isDisabled?: boolean;
  isChecked?: boolean;
  isRequred?: boolean;
}

function Checkbox({ ...props }: CheckboxInterface) {
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
}

export default Checkbox;
