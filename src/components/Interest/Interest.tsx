import React from 'react';
import { IInterestProps } from './types';
import styles from './Interest.module.scss';

const Interest = ({ interest }: IInterestProps) => {
  return <div className={styles.Interest}>{interest}</div>;
};

export default Interest;
