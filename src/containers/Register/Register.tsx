import React, { useEffect, useState } from 'react';
import styles from './Register.module.scss';
import UserForm from '../../components/UserForm/UserForm';
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
      <UserForm interests={interests} type='register' />
    </div>
  );
};

export default Register;
