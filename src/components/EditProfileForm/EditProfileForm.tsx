import React, { useEffect, useState } from 'react';
import styles from './EditProfileForm.module.scss';
import { IEditProfileFormProps, IEditProfileFormValues } from './types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { editProfileAction } from '../../containers/Profile/actions';
import { useFormik } from 'formik';
import InterestCheckbox from '../InterestCheckbox/InterestCheckbox';
import { forwardTo } from '../../lib/history';
import { getCookie } from '../../lib/cookie';
import { IInterest } from '../../containers/Register/types';
import axios from 'axios';
import defaultAvatar from '../../assets/avatar.png';
import SubmitButton from '../SubmitButton/SubmitButton';
import CancelButton from '../CancelButton/CancelButton';
import { showNotification } from '../../lib/notifications';
import * as Yup from 'yup';

const EditProfileForm = ({ user, interests }: IEditProfileFormProps) => {
  const { t } = useTranslation();

  const dispatcher = useDispatch();

  const [firstNameInput, setFirstNameInput] = useState<boolean>(false);
  const [lastNameInput, setLastNameInput] = useState<boolean>(false);
  const [ageInput, setAgeInput] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<boolean>(false);

  const [avatar, setAvatar] = useState<string>(user.avatar || ' ');

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required!')
      .min(3, t('Min. number of characters is 3.'))
      .max(20, t('Max. number of characters is 20.')),
    lastName: Yup.string()
      .required('Last name is required!')
      .min(3, t('Min. number of characters is 3.'))
      .max(30, t('Max. number of characters is 30.')),
    age: Yup.number().required('Age is required!').min(10, 'Min. age is 10.').max(99, 'Max. age is 99.'),
    currentPassword: Yup.string().min(8, 'Min. number of characters is 8.').max(16, 'Max. number of characters is 16.'),
    newPassword: Yup.string().min(8, 'Min. number of characters is 8.').max(16, 'Max. number of characters is 16.'),
    repeatNewPassword: Yup.string().test('match-password', 'Passwords must be the same!', function (value) {
      return this.parent.newPassword === value;
    }),
  });

  const initialValues: IEditProfileFormValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    interests: [],
    age: user.age,
    avatar: user.avatar,
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const cookieExist = getCookie();

      if (cookieExist) {
        const cookie = JSON.parse(getCookie() || '');
        dispatcher(
          editProfileAction(
            { ...values, login: cookie.login, interests: values.interests.length > 0 ? values.interests : user.interests },
            cookie.token
          )
        );
      }

      forwardTo('/profile');
    },
  });

  const cancelForm = () => {
    formik.setValues(initialValues);
    showNotification('warning', 'Warning', 'Default values have been set.');
  };

  const cancelInput = (name: string, value: string) => {
    if (name === 'age') {
      formik.setFieldValue(name, parseInt(value, 10));
    } else {
      formik.setFieldValue(name, value);
    }
  };

  const savePassword = async () => {
    const response = await fetch('https://oskasieg-social-app.herokuapp.com/user', {
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
      setPasswordInput(false);
    } else if (response.status === 402) {
      showNotification('danger', 'Error', 'Invalid current password!');
    }
  };

  const handleImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const formData = new FormData();
      formData.append('avatar', e.currentTarget.files[0]);
      formData.append('login', user.login || ' ');

      setAvatar(URL.createObjectURL(e.currentTarget.files[0]));

      const cookieExist = getCookie();
      if (cookieExist) {
        const cookie = JSON.parse(getCookie() || ' ');
        axios.put('https://oskasieg-social-app.herokuapp.com/user/profile/edit', formData, {
          headers: { 'Content-type': 'application/json', Authorization: `Bearer ${cookie.token}` },
        });

        showNotification('info', 'Information', 'You have edited the profile!');
      }
    }
  };

  useEffect(() => {
    formik.setValues({ ...user, currentPassword: '', newPassword: '', repeatNewPassword: '', interests: [] });
    setAvatar(user.avatar);
    // eslint-disable-next-line
  }, [user]);

  const { setFieldTouched, errors, touched } = formik;

  return (
    <form className={styles.EditProfileForm} onSubmit={formik.handleSubmit}>
      <div className={styles.EditProfileForm__title}>{t('Avatar')}</div>
      <div className={styles.EditProfileForm__row} style={{ justifyContent: 'center' }}>
        <div className={styles.EditProfileForm__avatar}>
          <img className={styles.EditProfileForm__image} src={avatar ? avatar : user.avatar ? user.avatar : defaultAvatar} alt='avatar' />
          <input name='avatar' type='file' className={styles.EditProfileForm__fileInput} onChange={handleImageChange} />
        </div>
      </div>
      <div className={styles.EditProfileForm__line} />

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
              autoComplete='off'
              type='text'
              className={styles.EditProfileForm__input}
              onChange={formik.handleChange}
              onClick={() => setFieldTouched('firstName')}
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
            {errors.firstName && touched.firstName ? <div className={styles.EditProfileForm__error}>{t(errors.firstName)}</div> : null}
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
            <button type='button' className={styles.EditProfileForm__button} onClick={() => setLastNameInput(true)}>
              {t('Edit')}
            </button>
          </>
        )}
        {lastNameInput && (
          <>
            <input
              name='lastName'
              autoComplete='off'
              type='text'
              className={styles.EditProfileForm__input}
              onChange={formik.handleChange}
              onClick={() => setFieldTouched('lastName')}
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
            {errors.lastName && touched.lastName ? <div className={styles.EditProfileForm__error}>{t(errors.lastName)}</div> : null}
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
            <button type='button' className={styles.EditProfileForm__button} onClick={() => setAgeInput(true)}>
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
              autoComplete='off'
              onClick={() => setFieldTouched('age')}
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
            {errors.age && touched.age ? <div className={styles.EditProfileForm__error}>{t(errors.age)}</div> : null}
          </>
        )}
      </div>

      <div className={styles.EditProfileForm__line} />
      <div className={styles.EditProfileForm__title}>{t('Password')}</div>
      {!passwordInput && (
        <button type='button' onClick={() => setPasswordInput(true)} className={styles.EditProfileForm__button}>
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
              onClick={() => setFieldTouched('currentPassword')}
              value={formik.values.currentPassword}
            />
            <button type='button' className={styles.EditProfileForm__button} onClick={() => savePassword()}>
              {t('Save')}
            </button>
            {errors.currentPassword && touched.currentPassword ? (
              <div className={styles.EditProfileForm__error}>{t(errors.currentPassword)}</div>
            ) : null}
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
              onClick={() => setFieldTouched('newPassword')}
              value={formik.values.newPassword}
            />
            <button
              type='button'
              className={styles.EditProfileForm__buttonCancel}
              onClick={() => {
                formik.setFieldValue('newPassword', '');
                formik.setFieldValue('repeatNewPassword', '');
                formik.setFieldValue('currentPassword', '');
                setPasswordInput(false);
              }}
            >
              {t('Cancel')}
            </button>
          </div>
          {errors.newPassword && touched.newPassword ? <div className={styles.EditProfileForm__error}>{t(errors.newPassword)}</div> : null}
          <div className={styles.EditProfileForm__row} style={{ flexDirection: 'column' }}>
            <label htmlFor='password' className={styles.EditProfileForm__label}>
              {t('Repeat new password')}
            </label>
            <input
              name='repeatNewPassword'
              type='password'
              autoComplete='off'
              className={styles.EditProfileForm__input}
              onChange={formik.handleChange}
              onClick={() => setFieldTouched('repeatNewPassword')}
              value={formik.values.repeatNewPassword}
            />
          </div>
          {errors.repeatNewPassword && touched.repeatNewPassword ? (
            <div className={styles.EditProfileForm__error}>{t(errors.repeatNewPassword)}</div>
          ) : null}
        </>
      )}

      <div className={styles.EditProfileForm__line} />
      <div className={styles.EditProfileForm__title}>{t('Interests')}</div>
      <div className={styles.EditProfileForm__row} style={{ overflowX: 'auto', padding: '0.5rem', justifyContent: 'space-evenly' }}>
        {interests &&
          interests.map((interest: IInterest) => (
            <InterestCheckbox key={interest.name} name='interests' value={interest.name} onChange={formik.handleChange} />
          ))}
      </div>

      <div className={styles.EditProfileForm__line} />

      <div className={styles.EditProfileForm__row} style={{ justifyContent: 'space-evenly', marginTop: '0.5rem' }}>
        <SubmitButton text='Save' type='submit' />
        <CancelButton text='Reset' type='button' onClick={cancelForm} />
      </div>
    </form>
  );
};

export default EditProfileForm;
