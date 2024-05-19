import RegisterForm from './Component/RegisterForm';
import Button from '../../components/ui/button/Button';
import classes from './Component/Rigister.module.scss';

export default function RegisterPage() {
  return (
    <section className={`container`}>
      <div className={`grid ${classes.register}`}>
        <Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="19"
            viewBox="0 0 12 19"
            fill="none"
            aria-label="Go Back"
          >
            <path
              d="M10.5 18L2 9.5L10.5 1"
              stroke="#758963"
              strokeWidth="1.5"
            />
          </svg>
        </Button>
        <RegisterForm />
      </div>
    </section>
  );
}
