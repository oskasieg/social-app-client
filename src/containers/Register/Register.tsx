import React, { useEffect, useState } from 'react';
import styles from './Register.module.scss';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { IInterest } from './types';

const Register = () => {
  const [interests, setInterests] = useState<IInterest[]>([]);

  useEffect(() => {
    const fetchInterests = async () => {
      const response = await fetch('http://localhost:8000/interests');
      const json = await response.json();

      setInterests(json);
    };

    fetchInterests();
  }, []);

  return (
    <div className={styles.Register}>
      <div className={styles.Register__title}>Register</div>
      <RegisterForm interests={interests} />
    </div>
  );
};

export default Register;
