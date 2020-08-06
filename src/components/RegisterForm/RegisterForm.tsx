import React from 'react';
import { useFormik } from 'formik';
import styles from './RegisterForm.module.scss';
import { IRegisterFormValues, IRegisterFormProps } from '../../containers/Register/types';
import { signUpAction } from '../../containers/Register/actions';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const RegisterForm = ({ interests }: IRegisterFormProps) => {
  const dispatcher = useDispatch();

  const { t } = useTranslation();

  const initialValues: IRegisterFormValues = {
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
      dispatcher(signUpAction(values));
    },
  });

  return (
    <form className={styles.RegisterForm} onSubmit={formik.handleSubmit}>
      <label htmlFor='login' className={styles.RegisterForm__label}>
        Login
      </label>
      <input
        id='login'
        name='login'
        type='text'
        className={styles.RegisterForm__textInput}
        onChange={formik.handleChange}
        value={formik.values.login}
      />

      <label htmlFor='password' className={styles.RegisterForm__label}>
        {t('Password')}
      </label>
      <input
        id='password'
        name='password'
        type='password'
        autoComplete='on'
        className={styles.RegisterForm__textInput}
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <label htmlFor='repeatPassword' className={styles.RegisterForm__label}>
        Repeat password
      </label>
      <input
        id='repeatPassword'
        name='repeatPassword'
        type='password'
        autoComplete='on'
        className={styles.RegisterForm__textInput}
        onChange={formik.handleChange}
        value={formik.values.repeatPassword}
      />

      <label htmlFor='firstName' className={styles.RegisterForm__label}>
        First name
      </label>
      <input
        id='firstName'
        name='firstName'
        type='text'
        className={styles.RegisterForm__textInput}
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />

      <label htmlFor='lastName' className={styles.RegisterForm__label}>
        Last name
      </label>
      <input
        id='lastName'
        name='lastName'
        type='text'
        className={styles.RegisterForm__textInput}
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />

      <label htmlFor='age' className={styles.RegisterForm__label}>
        Age
      </label>
      <input
        id='age'
        name='age'
        type='number'
        className={styles.RegisterForm__textInput}
        onChange={formik.handleChange}
        value={formik.values.age}
      />

      <label htmlFor='interests' className={styles.RegisterForm__label}>
        Interests
      </label>
      <div className={styles.RegisterForm__tags}>
        {interests.length &&
          interests.map((interest) => (
            <div key={interest.name} className={styles.RegisterForm__tag}>
              {interest.name}
              <input name='interests' type='checkbox' value={interest.name} onChange={formik.handleChange} />
            </div>
          ))}
      </div>
      <button type='submit' className={styles.RegisterForm__button}>
        Sign up
      </button>
    </form>
  );
};

export default RegisterForm;
