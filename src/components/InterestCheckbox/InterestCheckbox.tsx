import React from 'react';
import { IInterestCheckboxProps } from './types';
import { useTranslation } from 'react-i18next';
import styles from './InterestCheckbox.module.scss';

const InterestCheckbox = ({ name, value, onChange }: IInterestCheckboxProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.InterestCheckbox}>
      <div className={styles.InterestCheckbox__name}>{t(value)}</div>
      <input name={name} value={value} type='checkbox' onChange={onChange} />
    </div>
  );
};

export default InterestCheckbox;
