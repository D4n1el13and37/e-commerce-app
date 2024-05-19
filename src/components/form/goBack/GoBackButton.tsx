import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/button/Button';

const GoBackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Button onClick={handleBack}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="19"
        viewBox="0 0 11 19"
        fill="none"
      >
        <path
          d="M10.479 0.604004L2.02063 9.06238L10.479 17.5208"
          stroke="#758963"
          strokeWidth="1.5"
        />
      </svg>
    </Button>
  );
};
export default GoBackButton;
