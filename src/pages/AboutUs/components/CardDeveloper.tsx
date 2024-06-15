import React, { useState } from 'react';
import cn from 'classnames';

import classes from '../AboutUs.module.scss';
import TelegramIcon from './TelegramIcon';
import GitIcon from './GitIcon';

interface Developer {
  imgPath: string;
  name: string;
  role: string;
  text: string;
  telegram: string;
  git: string;
  inverseBlock?: boolean;
}

const CardDeveloper: React.FC<Developer> = ({
  imgPath,
  name,
  role,
  text,
  telegram,
  git,
  inverseBlock,
}) => {
  const [isHover, setIsHover] = useState(false);

  const HandleMouseEnter = () => {
    setIsHover(true);
  };

  const HandleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <div
      className={cn(
        classes.developer,
        inverseBlock && classes.developerInverse
      )}
    >
      <div
        onMouseEnter={HandleMouseEnter}
        onMouseLeave={HandleMouseLeave}
        className={classes.photoBox}
      >
        <div className={cn(classes.greenBox, isHover && classes.visible)}>
          <div>
            <p className={classes.greenBox__name}>{name}</p>
            <p className={classes.greenBox__role}>{role}</p>
          </div>
        </div>

        <img
          className={classes.developer__photo}
          src={imgPath}
          alt="photo developer"
        />
      </div>
      <div className={classes.infoBox}>
        <div className={classes.infoBox__wrapper}>
          <div>
            <div className={classes.linkBox}>
              <a
                href={telegram}
                className={classes.linkBox__link}
                target="_blank"
              >
                <TelegramIcon />
              </a>
              <a
                href={git}
                className={cn(classes.linkBox__git, classes.linkBox__link)}
                target="_blank"
              >
                <GitIcon />
              </a>
            </div>
            <p className={classes.infoBox__name}>{name}</p>
            <p className={classes.infoBox__role}>{role}</p>
          </div>
        </div>
        <p className={classes.infoBox__text}>{text}</p>
      </div>
    </div>
  );
};

export default CardDeveloper;
