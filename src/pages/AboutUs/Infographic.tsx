import React from 'react';
import classes from './AboutUs.module.scss';

interface InfographicProps {
  subheader: string;
  number: string;
  text: string;
}

const Infographic: React.FC<InfographicProps> = ({
  subheader,
  number,
  text,
}) => (
  <div className={classes.infographic}>
    <p className={classes.infographic__sub}>{subheader}</p>
    <p className={classes.infographic__number}>{number}</p>
    <p className={classes.infographic__text}>{text}</p>
  </div>
);

export default Infographic;
