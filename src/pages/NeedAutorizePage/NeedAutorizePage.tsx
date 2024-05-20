import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Button from '../../components/ui/button/Button';

import SadPlant from '../NotFound/sad-plant.svg';
import s from './NotFound.module.scss';

const NeedAutorizePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoAutorize = () => {
    navigate('/login');
  };
  const handleGoRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <Header />
      <section className={s.not_found_section}>
        <div className="container grid">
          <div className={s.not_found_section__left}>
            <h1 className={s.not_found_section__title}>
              You are not autorized
            </h1>
            <p className={s.not_found_section__descr}>
              The page is available only to authorized users
            </p>
            <Button isMain={true} onClick={handleGoAutorize}>
              Go to login
            </Button>
            <p className={s.not_found_section__descr}>
              or create a new account
            </p>
            <Button isMain={true} onClick={handleGoRegister}>
              Register new Account
            </Button>
          </div>
          <div className={s.not_found_section__right}>
            <img src={SadPlant} alt="Page not found" aria-hidden="true" />
          </div>
        </div>
      </section>
    </>
  );
};

export default NeedAutorizePage;
