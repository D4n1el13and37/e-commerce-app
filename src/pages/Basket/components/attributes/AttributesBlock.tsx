import { Attribute } from '@commercetools/platform-sdk';
import React from 'react';

import cl from './AttributesBlock.module.scss';

interface AttributeProps {
  attributes: Attribute[];
  id: string;
}

const splitName = (name: string): string => {
  let answer = '';
  for (let i = 0; i < name.length; i += 1) {
    if (name[i].toUpperCase() === name[i]) {
      answer += ` ${name[i]}`;
    } else {
      answer += name[i];
    }
    if (i === 0) {
      answer = answer[0].toUpperCase();
    }
  }
  return answer;
};

const AttributesBlock: React.FC<AttributeProps> = ({ attributes, id }) => (
  <>
    <ul className={cl.attributes__list}>
      {attributes.map((attribute) => (
        <li
          key={`${id}attribute${attribute.name}`}
          className={cl.attributes__item}
        >
          <span>{splitName(attribute.name)}:</span>
          <span>{attribute.value.label}</span>
        </li>
      ))}
    </ul>
  </>
);

export default AttributesBlock;
