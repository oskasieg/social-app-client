import React, { useEffect, useState } from 'react';
import styles from './EditProfileForm.module.scss';
import { IEditProfileFormProps, IEditProfileFormValues } from './types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { editProfileAction, signInAction } from '../../containers/Profile/actions';
import { useFormik } from 'formik';
import { IInterest } from '../../containers/Register/types';
import InterestCheckbox from '../InterestCheckbox/InterestCheckbox';

const EditProfileForm = ({ user, interests }: IEditProfileFormProps) => {
  const { t } = useTranslation();

  const dispatcher = useDispatch();

  const [firstNameInput, setFirstNameInput] = useState<boolean>(false);
  const [lastNameInput, setLastNameInput] = useState<boolean>(false);
  const [ageInput, setAgeInput] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<boolean>(false);

  const initialValues: IEditProfileFormValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    interests: user.interests,
    age: user.age,
    avatar: user.avatar,
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  const cancelForm = () => {
    formik.setValues(initialValues);
  };

  const cancelInput = (name: string, value: string) => {
    if (name === 'age') {
      formik.setFieldValue(name, parseInt(value, 10));
    } else {
      formik.setFieldValue(name, value);
    }
  };

  const savePassword = async () => {
    const response = await fetch('http://localhost:8000/user', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        login: user.login,
        password: formik.values.currentPassword,
      }),
    });

    if (response.status === 200 && formik.values.newPassword === formik.values.repeatNewPassword) {
      formik.setFieldValue('password', formik.values.newPassword);
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    formik.setValues({ ...user, currentPassword: '', newPassword: '', repeatNewPassword: '' });
  }, [user]);

  return (
    <form className={styles.EditProfileForm} onSubmit={formik.handleSubmit}>
      <div className={styles.EditProfileForm__title}>{t('Personal data')}</div>

      <label htmlFor='firstName' className={styles.EditProfileForm__label}>
        {t('First name')}
      </label>
      <div className={styles.EditProfileForm__row}>
        {!firstNameInput && (
          <>
            <div className={styles.EditProfileForm__field}>{formik.values.firstName}</div>
            <button className={styles.EditProfileForm__button} onClick={() => setFirstNameInput(true)}>
              {t('Edit')}
            </button>
          </>
        )}
        {firstNameInput && (
          <>
            <input
              name='firstName'
              type='text'
              className={styles.EditProfileForm__input}
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            <button type='button' className={styles.EditProfileForm__button} onClick={() => setFirstNameInput(false)}>
              {t('Save')}
            </button>
            <button
              type='button'
              className={styles.EditProfileForm__buttonCancel}
              onClick={() => {
                setFirstNameInput(false);
                cancelInput('firstName', user.firstName);
              }}
            >
              {t('Cancel')}
            </button>
          </>
        )}
      </div>

      <label htmlFor='lastName' className={styles.EditProfileForm__label}>
        {t('Last name')}
      </label>
      <div className={styles.EditProfileForm__row}>
        {!lastNameInput && (
          <>
            <div className={styles.EditProfileForm__field}>{formik.values.lastName}</div>
            <button className={styles.EditProfileForm__button} onClick={() => setLastNameInput(true)}>
              {t('Edit')}
            </button>
          </>
        )}
        {lastNameInput && (
          <>
            <input
              name='lastName'
              type='text'
              className={styles.EditProfileForm__input}
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            <button type='button' className={styles.EditProfileForm__button} onClick={() => setLastNameInput(false)}>
              {t('Save')}
            </button>
            <button
              type='button'
              className={styles.EditProfileForm__buttonCancel}
              onClick={() => {
                setLastNameInput(false);
                cancelInput('lastName', user.lastName);
              }}
            >
              {t('Cancel')}
            </button>
          </>
        )}
      </div>

      <label htmlFor='age' className={styles.EditProfileForm__label}>
        {t('Age')}
      </label>
      <div className={styles.EditProfileForm__row}>
        {!ageInput && (
          <>
            <div className={styles.EditProfileForm__field}>{formik.values.age}</div>
            <button className={styles.EditProfileForm__button} onClick={() => setAgeInput(true)}>
              {t('Edit')}
            </button>
          </>
        )}
        {ageInput && (
          <>
            <input
              name='age'
              type='number'
              className={styles.EditProfileForm__input}
              onChange={formik.handleChange}
              value={formik.values.age}
            />
            <button type='button' className={styles.EditProfileForm__button} onClick={() => setAgeInput(false)}>
              {t('Save')}
            </button>
            <button
              type='button'
              className={styles.EditProfileForm__buttonCancel}
              onClick={() => {
                setAgeInput(false);
                cancelInput('age', user.age.toString());
              }}
            >
              {t('Cancel')}
            </button>
          </>
        )}
      </div>

      <div className={styles.EditProfileForm__line} />
      <div className={styles.EditProfileForm__title}>{t('Password')}</div>
      {!passwordInput && (
        <button onClick={() => setPasswordInput(true)} className={styles.EditProfileForm__button}>
          {t('Edit password')}
        </button>
      )}
      {passwordInput && (
        <>
          <label htmlFor='currentPassword' className={styles.EditProfileForm__label}>
            {t('Current password')}
          </label>
          <div className={styles.EditProfileForm__row}>
            <input
              name='currentPassword'
              type='password'
              autoComplete='off'
              className={styles.EditProfileForm__input}
              onChange={formik.handleChange}
              value={formik.values.currentPassword}
            />
            <button type='button' className={styles.EditProfileForm__button} onClick={() => savePassword()}>
              {t('Save')}
            </button>
          </div>
          <label htmlFor='password' className={styles.EditProfileForm__label}>
            {t('New password')}
          </label>
          <div className={styles.EditProfileForm__row}>
            <input
              name='newPassword'
              type='password'
              autoComplete='off'
              className={styles.EditProfileForm__input}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
            />
            <button type='button' className={styles.EditProfileForm__buttonCancel} onClick={() => setPasswordInput(false)}>
              {t('Cancel')}
            </button>
          </div>
          <div className={styles.EditProfileForm__row}>
            <label htmlFor='password' className={styles.EditProfileForm__label}>
              {t('Repeat new password')}
            </label>
            <input
              name='repeatNewPassword'
              type='password'
              autoComplete='off'
              className={styles.EditProfileForm__input}
              onChange={formik.handleChange}
              value={formik.values.repeatNewPassword}
            />
          </div>
        </>
      )}

      <div className={styles.EditProfileForm__line} />
      <div className={styles.EditProfileForm__title}>{t('Interests')}</div>
      <div className={styles.EditProfileForm__row} style={{ overflowX: 'auto', padding: '0.5rem', flexWrap: 'nowrap' }}>
        {user.interests &&
          user.interests.map((interest: string) => (
            <InterestCheckbox key={interest} name='interests' value={interest} onChange={formik.handleChange} />
          ))}
      </div>

      <div className={styles.EditProfileForm__row} style={{ justifyContent: 'space-evenly', marginTop: '0.5rem' }}>
        <button type='submit' className={styles.EditProfileForm__buttonSubmit}>
          {t('Save')}
        </button>
        <button type='button' className={styles.EditProfileForm__buttonCancelForm} onClick={() => cancelForm()}>
          {t('Cancel')}
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
