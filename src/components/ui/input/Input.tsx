import React, { InputHTMLAttributes, forwardRef } from 'react';
import classes from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'password' | 'email' | 'date' | 'number' | 'search' | 'tel';
  fieldName: string;
  id: string;
  width?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, fieldName, width, ...props }, ref) => (
    <div
      className={classes.container}
      style={{ width }}
      data-testid="input-container"
    >
      <label htmlFor={id} className={classes.label}>
        {fieldName && <span>{fieldName}</span>}
      </label>
      <input
        data-testid="input"
        id={id}
        type={type}
        ref={ref}
        className={classes.input}
        {...props}
      />
    </div>
  )
);

export default Input;
