import React from 'react';
import styles from './SubmitButton.module.scss';
import { ISubmitButtonProps } from './types';
import { useTranslation } from 'react-i18next';

const SubmitButton = ({ type, text }: ISubmitButtonProps) => {
  const { t } = useTranslation();

  return (
    <button className={styles.SubmitButton} type={type}>
      {t(text)}
    </button>
  );
};

export default SubmitButton;
