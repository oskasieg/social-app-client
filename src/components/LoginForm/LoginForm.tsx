import React from 'react';
import styles from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { ILoginFormValues } from '../../containers/Profile/types';
import { useDispatch } from 'react-redux';
import { signInAction } from '../../containers/Profile/actions';
import SubmitButton from '../SubmitButton/SubmitButton';
import * as Yup from 'yup';

const LoginForm = () => {
  const { t } = useTranslation();

  const dispatcher = useDispatch();

  const validationSchema = Yup.object().shape({
    login: Yup.string()
      .required('Login is required!')
      .min(3, 'Min. number of characters is 3.')
      .max(20, 'Max. number of characters is 20.'),
    password: Yup.string()
      .required('Password is required!')
      .min(8, 'Min. number of characters is 8.')
      .max(16, 'Max. number of characters is 16.'),
  });

  const initialValues: ILoginFormValues = {
    login: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatcher(signInAction(values));
      formik.setFieldValue('login', '');
      formik.setFieldValue('password', '');
    },
  });

  const { handleChange, setFieldTouched, errors, touched } = formik;

  return (
    <div className={styles.LoginForm}>
      <div className={styles.LoginForm__title}>{t('Login form')}</div>
      <form className={styles.LoginForm__form} onSubmit={formik.handleSubmit}>
        <label htmlFor='login' className={styles.LoginForm__label}>
          Login
        </label>
        <input
          autoComplete='off'
          name='login'
          type='text'
          className={styles.LoginForm__input}
          onChange={handleChange}
          onClick={() => setFieldTouched('login')}
          value={formik.values.login}
        />
        <div className={styles.LoginForm__error}>{errors.login && touched.login ? t(errors.login) : null}</div>

        <label htmlFor='password' className={styles.LoginForm__label}>
          {t('Password')}
        </label>
        <input
          name='password'
          type='password'
          autoComplete='on'
          className={styles.LoginForm__input}
          onChange={handleChange}
          onClick={() => setFieldTouched('password')}
          value={formik.values.password}
        />
        <div className={styles.LoginForm__error} style={{ marginBottom: '0.5rem' }}>
          {errors.password && touched.password ? t(errors.password) : null}
        </div>

        <SubmitButton type='submit' text='Submit' />
      </form>
    </div>
  );
};

export default LoginForm;
