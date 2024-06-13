import Header from '../../components/header/Header';
import CardDeveloper from './CardDeveloper';
import classes from './AboutUs.module.scss';
import Footer from '../../components/footer/Footer';

const AboutUs = () => {
  const ourStack = [
    'React',
    'Redux',
    'Commerce Tools API',
    'HTML5',
    'CSS3',
    'TypeScript',
    'RESTful API',
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
    'React Testing Library',
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
            <div className={classes.infographic}>
              <p className={classes.infographic__sub}>Hours</p>
              <p className={classes.infographic__number}>100+</p>
              <p className={classes.infographic__text}>Team work</p>
            </div>
            <div className={classes.infographic}>
              <p className={classes.infographic__sub}>Amount</p>
              <p className={classes.infographic__number}>30+</p>
              <p className={classes.infographic__text}>Review code</p>
            </div>
            <div className={classes.infographic}>
              <p className={classes.infographic__sub}>Hours</p>
              <p className={classes.infographic__number}>100+</p>
              <p className={classes.infographic__text}>???</p>
            </div>
          </div>

          <div className={classes.stack}>
            {ourStack.map((item) => (
              <p className={classes.stack__item}>{item}</p>
            ))}
          </div>

          <p className={classes.about__description}>
            Our team of three frontend developers — Daniil, Vasiliy, and Anna —
            demonstrated excellent collaboration throughout the project.
            Supporting each other, we solved problems together and shared ideas.
            Through regular meetings and clear task distribution, we
            successfully integrated all parts of the project into a unified
            system. Our efforts led to achieving our goals and receiving
            positive feedback from users.
          </p>

          <div className={classes.developerBox}>
            <CardDeveloper
              imgPath="src/pages/AboutUs/Vasiliy.jpg"
              name="Daniil Gorokhov"
              role="Team Lead"
              text="Daniil played a key role as the team lead, coordinating development stages and task distribution. He implemented complex features, integrated with the Commerce Tools API, and ensured efficient team collaboration. Daniil mastered Redux and guided the team in its use, enhancing state management and performance. He developed the catalog page and routing, improving navigation and user experience."
              telegram="https://t.me/client_telegramm"
              git="https://github.com/D4n1el13and37"
            />
            <CardDeveloper
              imgPath="src/pages/AboutUs/Vasiliy.jpg"
              name="Anna Kainova"
              role="Developer"
              text="Anna developed user forms and interfaces, including the registration form, user profile, filters, and sorting. She created intuitive and user-friendly interfaces that improved the user experience. Anna actively worked with Commerce Tools, integrating design solutions with platform functionality, ensuring high performance and excellent visual quality."
              telegram="https://t.me/annkainova"
              git="https://github.com/annkainova"
            />
            <CardDeveloper
              imgPath="src/pages/AboutUs/Vasiliy.jpg"
              name="Vasiliy Antoniuc"
              role="Developer"
              text="Vasiliy created high-quality, responsive web pages with a focus on layout and animations. His expertise in CSS and JavaScript allowed for the implementation of animations that enhanced user experience. He also worked on the product page and shopping cart, ensuring seamless integration with the Commerce Tools platform and improving site functionality."
              telegram="https://t.me/Minecline"
              git="https://github.com/Mineclinee"
            />
          </div>

          <a href="https://rs.school/" target="_blank">
            <img
              className={classes.logo}
              src="src/pages/AboutUs/logo-rsschool3.png"
              alt="Logo RS School"
            />
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
