import React from 'react';
import { useFormik } from 'formik';
import styles from './UserForm.module.scss';
import { IUserFormValues, IInterest } from '../../containers/Register/types';
import { signUpAction } from '../../containers/Register/actions';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IUserFormProps } from './types';
import InterestCheckbox from '../InterestCheckbox/InterestCheckbox';
import SubmitButton from '../SubmitButton/SubmitButton';
import * as Yup from 'yup';

const UserForm = ({ interests, type }: IUserFormProps) => {
  const dispatcher = useDispatch();

  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    login: Yup.string()
      .required(t('Login is required!'))
      .min(3, t('Min. number of characters is 3.'))
      .max(20, t('Max. number of characters is 20.')),
    password: Yup.string()
      .required('Password is required!')
      .min(8, 'Min. number of characters is 8.')
      .max(16, 'Max. number of characters is 16.'),
    repeatPassword: Yup.string()
      .required('Passwords must be the same!')
      .test('passwords-match', 'Passwords must be the same!', function (value) {
        return this.parent.password === value;
      }),
    firstName: Yup.string()
      .required('First name is required!')
      .min(3, t('Min. number of characters is 3.'))
      .max(20, t('Max. number of characters is 20.')),
    lastName: Yup.string()
      .required('Last name is required!')
      .min(3, t('Min. number of characters is 3.'))
      .max(30, t('Max. number of characters is 30.')),
    age: Yup.number().required('Age is required!').min(10, 'Min. age is 10.').max(99, 'Max. age is 99.'),
  });

  const initialValues: IUserFormValues = {
    login: '',
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    age: 10,
    interests: [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (type === 'register') {
        dispatcher(signUpAction(values));
      }
    },
  });

  const { errors, touched, handleChange, setFieldTouched } = formik;

  return (
    <form className={styles.UserForm} onSubmit={formik.handleSubmit}>
      <label htmlFor='login' className={styles.UserForm__label}>
        Login
      </label>
      <input
        autoComplete='off'
        id='login'
        name='login'
        type='text'
        className={styles.UserForm__textInput}
        onChange={handleChange}
        onClick={() => setFieldTouched('login')}
        value={formik.values.login}
      />
      <div className={styles.UserForm__error}>{errors.login && touched.login ? t(errors.login) : null}</div>

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
        onClick={() => setFieldTouched('password')}
        value={formik.values.password}
      />
      <div className={styles.UserForm__error}>{errors.password && touched.password ? t(errors.password) : null}</div>

      <label htmlFor='repeatPassword' className={styles.UserForm__label}>
        {t('Repeat password')}
      </label>
      <input
        id='repeatPassword'
        name='repeatPassword'
        type='password'
        autoComplete='on'
        className={styles.UserForm__textInput}
        onChange={formik.handleChange}
        onClick={() => setFieldTouched('repeatPassword')}
        value={formik.values.repeatPassword}
      />
      <div className={styles.UserForm__error}>{touched.repeatPassword && errors.repeatPassword ? t(errors.repeatPassword) : null}</div>

      <div className={styles.UserForm__line} />

      <label htmlFor='firstName' className={styles.UserForm__label}>
        {t('First name')}
      </label>
      <input
        id='firstName'
        name='firstName'
        type='text'
        autoComplete='off'
        className={styles.UserForm__textInput}
        onChange={formik.handleChange}
        onClick={() => setFieldTouched('firstName')}
        value={formik.values.firstName}
      />
      <div className={styles.UserForm__error}>{errors.firstName && touched.firstName ? t(errors.firstName) : null}</div>

      <label htmlFor='lastName' className={styles.UserForm__label}>
        {t('Last name')}
      </label>
      <input
        id='lastName'
        name='lastName'
        type='text'
        autoComplete='off'
        className={styles.UserForm__textInput}
        onChange={formik.handleChange}
        onClick={() => setFieldTouched('lastName')}
        value={formik.values.lastName}
      />
      <div className={styles.UserForm__error}>{errors.lastName && touched.lastName ? t(errors.lastName) : null}</div>

      <label htmlFor='age' className={styles.UserForm__label}>
        {t('Age')}
      </label>
      <input
        id='age'
        name='age'
        type='number'
        className={styles.UserForm__textInput}
        onChange={formik.handleChange}
        onClick={() => setFieldTouched('age')}
        value={formik.values.age}
      />
      <div className={styles.UserForm__error}>{touched.age && errors.age ? t(errors.age) : null}</div>

      <div className={styles.UserForm__line} />

      <label htmlFor='interests' className={styles.UserForm__label}>
        {t('Interests')}
      </label>
      <div
        className={styles.UserForm__tags}
        onClick={() => {
          formik.setFieldError('interests', 'Min. number of interests is 1.');
          setFieldTouched('interests');
        }}
      >
        {interests &&
          interests.map((interest: IInterest) => (
            <InterestCheckbox key={interest.name} name='interests' value={interest.name} onChange={formik.handleChange} />
          ))}
      </div>
      <div className={styles.UserForm__error} style={{ marginBottom: '0.5rem' }}>
        {touched.interests && formik.values.interests.length === 0 ? t('Min. number of interests is 1.') : null}
      </div>

      <SubmitButton type='submit' text='Register' />
    </form>
  );
};

export default UserForm;
