import { useState } from 'react';
import classes from './Checkbox.module.scss';

interface CheckboxInterface {
  label?: string;
  isChecked?: boolean;
  isRequred?: boolean;
}

function Checkbox({ ...props }: CheckboxInterface) {
  const [isChecked, setIsChecked] = useState(!!props.isChecked);
  function handleChange() {
    setIsChecked(!isChecked);
  }

  return (
    <div className={`${classes.checkbox_wrapper}`}>
      <label className={`${classes.checkbox}`}>
        <input
          type="checkbox"
          data-testid="checkbox"
          checked={isChecked}
          onChange={handleChange}
          required={props.isRequred}
        ></input>
        {props.label && <span>{props.label}</span>}
      </label>
    </div>
  );
}

export default Checkbox;
