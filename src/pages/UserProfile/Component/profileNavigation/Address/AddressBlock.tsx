import React, { useState } from 'react';
import cn from 'classnames';
import Button from '../../../../../components/ui/button/Button';

import classes from './AddressInfo.module.scss';
import EditModeModal from '../../ChangeAddressModal/EditModeModal';

interface AddressBlockProps {
  id: string;
  default?: string;
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}

const AddressBlock: React.FC<AddressBlockProps> = ({
  id,
  country,
  city,
  streetName,
  postalCode,
  ...props
}) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  return (
    <div className={classes.addressBlock}>
      <span className={classes.addressBlock__default}>{props.default}</span>
      <div className={classes.addressBlock__info}>
        <p className={classes.addressBlock__text}>{country}</p>
        <p className={classes.addressBlock__text}>{city}</p>
        <p className={classes.addressBlock__text}>{streetName}</p>
        <p className={classes.addressBlock__text}>{postalCode}</p>
      </div>
      <div className={classes.addressBlock__buttonWrapper}>
        <Button
          className={cn(classes.addressBlock__button, classes.edit)}
          onClick={() => {
            setIsOpenEdit(true);
          }}
        >
          Edit
        </Button>

        <EditModeModal
          isOpen={isOpenEdit}
          onRequestClose={() => setIsOpenEdit(false)}
          address={{ id, country, city, streetName, postalCode }}
        />
        <Button className={cn(classes.addressBlock__button, classes.del)}>
          Delete
        </Button>
      </div>
    </div>
  );
};
export default AddressBlock;
