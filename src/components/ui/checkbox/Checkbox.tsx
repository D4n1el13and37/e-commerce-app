import { InputHTMLAttributes, forwardRef } from 'react';
import classes from './Checkbox.module.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => (
    <>
      <label
        data-testid="checkbox-label"
        className={`${classes.checkbox_wrappper}`}
      >
        <input
          ref={ref}
          className={`${classes.input}`}
          type="checkbox"
          data-testid="checkbox"
          {...props}
        ></input>
        {label && <span>{label}</span>}
      </label>
    </>
  )
);

export default Checkbox;
