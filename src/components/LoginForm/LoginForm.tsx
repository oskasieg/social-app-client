import React from 'react';
import styles from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { ILoginFormValues } from '../../containers/Profile/types';
import { useDispatch } from 'react-redux';
import { signInAction } from '../../containers/Profile/actions';

const LoginForm = () => {
  const { t } = useTranslation();

  const dispatcher = useDispatch();

  const initialValues: ILoginFormValues = {
    login: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      dispatcher(signInAction(values));
      formik.setFieldValue('login', '');
      formik.setFieldValue('password', '');
    },
  });

  return (
    <div className={styles.LoginForm}>
      <div className={styles.LoginForm__title}>Sign up</div>
      <form className={styles.LoginForm__form} onSubmit={formik.handleSubmit}>
        <label htmlFor='login' className={styles.LoginForm__label}>
          Login
        </label>
        <input name='login' type='text' className={styles.LoginForm__input} onChange={formik.handleChange} value={formik.values.login} />

        <label htmlFor='password' className={styles.LoginForm__label}>
          {t('Password')}
        </label>
        <input
          name='password'
          type='password'
          autoComplete='on'
          className={styles.LoginForm__input}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button type='submit' className={styles.LoginForm__button}>
          {t('Submit')}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
