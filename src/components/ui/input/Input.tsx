// import { useState } from 'react';
import classes from './Input.module.scss';

interface InputInterface {
  type: 'text' | 'password' | 'email' | 'date' | 'number' | 'search' | 'tel';
  onChange?: () => void;
  value?: string;
  placehodler?: string;
  required?: boolean;
  fieldName?: string;
}

function Input({ ...props }: InputInterface) {
  return (
    <label className={`${classes}`}>
      {props.fieldName && <span>{props.fieldName}</span>}
      <input type={props.type} value={props.value} />
    </label>
  );
}

export default Input;
