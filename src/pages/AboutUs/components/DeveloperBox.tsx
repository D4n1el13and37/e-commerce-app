import CardDeveloper from './CardDeveloper';
import classes from '../AboutUs.module.scss';
import photoVasiliy from '../../../../public/photoDeveloper/Vasiliy.jpg';

const DeveloperBox = () => (
  <div className={classes.developerBox}>
    <CardDeveloper
      imgPath={photoVasiliy}
      name="Daniil Gorokhov"
      role="Team Lead"
      text="Daniil played a key role as the team lead, coordinating development stages and task distribution. He implemented complex features, integrated with the Commerce Tools API, and ensured efficient team collaboration. Daniil mastered Redux and guided the team in its use, enhancing state management and performance. He developed the catalog page and routing, improving navigation and user experience."
      telegram="https://t.me/client_telegramm"
      git="https://github.com/D4n1el13and37"
    />
    <CardDeveloper
      imgPath={photoVasiliy}
      name="Anna Kainova"
      role="Developer, Designer"
      text="Anna developed user forms and interfaces, including the registration form, user profile, filters, and sorting. She created intuitive and user-friendly interfaces that improved the user experience. Anna actively worked with Commerce Tools, integrating design solutions with platform functionality, ensuring high performance and excellent visual quality."
      telegram="https://t.me/annkainova"
      git="https://github.com/annkainova"
    />
    <CardDeveloper
      imgPath={photoVasiliy}
      name="Vasiliy Antoniuc"
      role="Developer"
      text="Vasiliy created high-quality, responsive web pages with a focus on layout and animations. His expertise in CSS and JavaScript allowed for the implementation of animations that enhanced user experience. He also worked on the product page and shopping cart, ensuring seamless integration with the Commerce Tools platform and improving site functionality."
      telegram="https://t.me/Minecline"
      git="https://github.com/Mineclinee"
    />
  </div>
);
export default DeveloperBox;
