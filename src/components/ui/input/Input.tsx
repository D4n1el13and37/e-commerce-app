import React, { InputHTMLAttributes } from 'react';
import classes from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'password' | 'email' | 'date' | 'number' | 'search' | 'tel';
  fieldName: string;
  id: string;
  width?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  id,
  fieldName,
  width,
  ...props
}) => (
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
      className={classes.input}
      {...props}
    />
  </div>
);

export default Input;
