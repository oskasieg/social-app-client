import React from 'react';
import styles from './Register.module.scss';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

const Register = () => {
  return (
    <div className={styles.Register}>
      <div className={styles.Register__title}>Register</div>
      <RegisterForm />
    </div>
  );
};

export default Register;
