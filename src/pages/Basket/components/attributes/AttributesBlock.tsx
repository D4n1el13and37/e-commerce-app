import { Attribute } from '@commercetools/platform-sdk';
import React from 'react';

import cl from './AttributesBlock.module.scss';

interface AttributeProps {
  attributes: Attribute[];
  id: string;
}

const splitName = (name: string): string =>
  name.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

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
