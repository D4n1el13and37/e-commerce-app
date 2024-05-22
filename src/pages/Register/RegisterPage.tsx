import cn from 'classnames';
import RegisterForm from './Component/RegisterForm';
import classes from './Component/Rigister.module.scss';
import GoBackButton from '../../components/form/goBack/GoBackButton';

export default function RegisterPage() {
  return (
    <section className={`container`}>
      <div className={cn('grid', classes.register)}>
        <GoBackButton />
        <RegisterForm />
      </div>
    </section>
  );
}
