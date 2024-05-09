import React, { ChangeEvent } from 'react';
import classes from './Input.module.scss';

interface InputInterface {
  type: 'text' | 'password' | 'email' | 'date' | 'number' | 'search' | 'tel';
  fieldName: string;
  onChange: (value: string) => void;
  value?: string;
  placehodler?: string;
  isRequired?: boolean;
  width?: string;
  error?: string;
}

const Input: React.FC<InputInterface> = ({ ...props }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };

  return (
    <div className={classes.container} style={{ width: props.width }}>
      <label className={classes.label}>
        {props.fieldName && <span>{props.fieldName}</span>}
      </label>
      <input
        className={classes.input}
        onChange={handleChange}
        placeholder={props.placehodler}
        type={props.type}
        value={props.value}
        required={props.isRequired}
      />
      {props.error && <p className={classes.error}>{props.error}</p>}
    </div>
  );
};

export default Input;
