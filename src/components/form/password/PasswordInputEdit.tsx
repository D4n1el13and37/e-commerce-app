import React, { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import pass from './Password.module.scss';
import Input from '../../ui/input/Input';
import validatePassword from './validatePassword';
import TooggleVisibilityButton from './TooggleVisibilityButton';

interface PasswordProps {
  readOnly?: boolean;
  onClick?: () => void;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;

  registerPassword: 'password' | 'currentPassword' | 'newPassword';
  label: 'Password' | 'Current Password' | 'New Password';
}

const PasswordFieldEdit: React.FC<PasswordProps> = ({
  readOnly,
  onClick,
  onChange,
  registerPassword,
  label,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassworVisibility = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setShowPassword(!showPassword);
      e.preventDefault();
    },
    [showPassword, setShowPassword]
  );

  return (
    <div className={pass.container} data-testid="password-container">
      <Input
        data-testid="password"
        label={label}
        autoComplete="current-password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        placeholder="Enter password"
        readOnly={readOnly}
        onClick={onClick}
        error={
          errors[registerPassword]
            ? (errors[registerPassword]?.message as string)
            : undefined
        }
        {...register(registerPassword, {
          required: 'Password is requred',
          minLength: {
            value: 8,
            message: 'Shoud be at least 8 symbols',
          },
          validate: validatePassword,
        })}
        onChange={onChange}
      />
      <TooggleVisibilityButton
        showPassword={showPassword}
        onClick={togglePassworVisibility}
      />
    </div>
  );
};

export default PasswordFieldEdit;
