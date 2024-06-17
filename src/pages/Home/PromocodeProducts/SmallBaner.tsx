import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/button/Button';
import classes from './promocodeProducts.module.scss';

interface SmallBanneProps {
  imgPath: string;
  title: string;
  text: string;
  link: string;
}

const SmallBanner: React.FC<SmallBanneProps> = ({
  imgPath,
  title,
  text,
  link,
}) => (
  <div className={classes.smallBaner}>
    <img className={classes.smallBaner__img} src={imgPath} alt={title} />
    <div className={classes.smallBaner__info}>
      <p className={classes.smallBaner__title}>{title}</p>
      <p className={classes.smallBaner__text}>{text}</p>
      <Link to={link}>
        <Button isMain={true} isFilled={true}>
          View detail
        </Button>
      </Link>
    </div>
  </div>
);
export default SmallBanner;
