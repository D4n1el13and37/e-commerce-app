import Header from '../../components/header/Header';
import classes from './AboutUs.module.scss';
import Footer from '../../components/footer/Footer';
import Infographic from './components/Infographic';
import DeveloperBox from './components/DeveloperBox';

import logoRS from '../../../public/logo-rsschool3.png';

const AboutUs = () => {
  const ourStack = [
    'React',
    'Redux',
    'Commerce Tools API',
    'HTML5',
    'CSS3',
    'TypeScript',
    'Git',
    'Vite',
    'SCSS',
    'Responsive Design',
    'JSON',
    'NPM',
    'React Router',
    'Vitest',
    'React Hook Form',
    'React Testing Library',
    'Jira',
    'Miro',
    'Figma',
  ];
  return (
    <>
      <Header />

      <main className="container">
        <div className={classes.about}>
          <p className={classes.about__subheader}>About Us</p>
          <h2 className={classes.about__header}>
            Unity in Development: Our Team's Journey
          </h2>

          <div className={classes.infographicBox}>
            <Infographic subheader="Hours" number="500+" text="Team work" />
            <Infographic subheader="Amount" number="80+" text="Code Reviews" />
            <Infographic subheader="Developer" number="3" text="Team Members" />
          </div>

          <div className={classes.stack}>
            {ourStack.map((item, index) => (
              <p key={item + index} className={classes.stack__item}>
                {item}
              </p>
            ))}
          </div>

          <p className={classes.about__description}>
            Our team of three frontend developers — Daniil, Vasilii, and Anna —
            demonstrated excellent collaboration throughout the project.
            Supporting each other, we solved problems together and shared ideas.
            Through regular meetings and clear task distribution, we
            successfully integrated all parts of the project into a unified
            system. Our efforts led to achieving our goals and receiving
            positive feedback from users.
          </p>

          <DeveloperBox />

          <a href="https://rs.school/" target="_blank">
            <img className={classes.logo} src={logoRS} alt="Logo RS School" />
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
