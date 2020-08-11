import React from 'react';
import styles from './CancelButton.module.scss';
import { ICancelButtonProps } from './types';
import { useTranslation } from 'react-i18next';

const CancelButton = ({ type, text, onClick }: ICancelButtonProps) => {
  const { t } = useTranslation();

  return (
    <button className={styles.CancelButton} type={type} onClick={onClick}>
      {t(text)}
    </button>
  );
};

export default CancelButton;
