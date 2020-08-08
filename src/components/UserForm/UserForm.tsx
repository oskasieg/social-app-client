import React from 'react';
import { useFormik } from 'formik';
import styles from './UserForm.module.scss';
import { IUserFormValues } from '../../containers/Register/types';
import { signUpAction } from '../../containers/Register/actions';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IUserFormProps } from './types';

const UserForm = ({ interests, type }: IUserFormProps) => {
  const dispatcher = useDispatch();

  const { t } = useTranslation();

  const initialValues: IUserFormValues = {
    login: '',
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    age: 0,
    interests: [],
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (type === 'register') {
        dispatcher(signUpAction(values));
      }
    },
  });

  return (
    <form className={styles.UserForm} onSubmit={formik.handleSubmit}>
      <label htmlFor='login' className={styles.UserForm__label}>
        Login
      </label>
      <input
        id='login'
        name='login'
        type='text'
        className={styles.UserForm__textInput}
        onChange={formik.handleChange}
        value={formik.values.login}
      />

      <label htmlFor='password' className={styles.UserForm__label}>
        {t('Password')}
      </label>
      <input
        id='password'
        name='password'
        type='password'
        autoComplete='on'
        className={styles.UserForm__textInput}
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <label htmlFor='repeatPassword' className={styles.UserForm__label}>
        Repeat password
      </label>
      <input
        id='repeatPassword'
        name='repeatPassword'
        type='password'
        autoComplete='on'
        className={styles.UserForm__textInput}
        onChange={formik.handleChange}
        value={formik.values.repeatPassword}
      />

      <label htmlFor='firstName' className={styles.UserForm__label}>
        First name
      </label>
      <input
        id='firstName'
        name='firstName'
        type='text'
        className={styles.UserForm__textInput}
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />

      <label htmlFor='lastName' className={styles.UserForm__label}>
        Last name
      </label>
      <input
        id='lastName'
        name='lastName'
        type='text'
        className={styles.UserForm__textInput}
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />

      <label htmlFor='age' className={styles.UserForm__label}>
        Age
      </label>
      <input
        id='age'
        name='age'
        type='number'
        className={styles.UserForm__textInput}
        onChange={formik.handleChange}
        value={formik.values.age}
      />

      <label htmlFor='interests' className={styles.UserForm__label}>
        Interests
      </label>
      <div className={styles.UserForm__tags}>
        {interests.length &&
          interests.map((interest) => (
            <div key={interest.name} className={styles.UserForm__tag}>
              {interest.name}
              <input name='interests' type='checkbox' value={interest.name} onChange={formik.handleChange} />
            </div>
          ))}
      </div>
      <button type='submit' className={styles.UserForm__button}>
        Sign up
      </button>
    </form>
  );
};

export default UserForm;
