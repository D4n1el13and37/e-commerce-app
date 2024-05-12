import { InputHTMLAttributes, forwardRef } from 'react';
import classes from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'password' | 'email' | 'date' | 'number' | 'search' | 'tel';
  label: string;
  id: string;
  width?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, label, width, error, ...props }, ref) => (
    <div
      className={classes.container}
      style={{ width }}
      data-testid="input-container"
    >
      <label htmlFor={id} className={classes.label}>
        {label && <span>{label}</span>}
      </label>
      <input
        data-testid="input"
        ref={ref}
        id={id}
        type={type}
        className={`${classes.input} ${error && 'error'}`}
        {...props}
      />
    </div>
  )
);

export default Input;
