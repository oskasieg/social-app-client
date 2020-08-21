import React from 'react';
import styles from './CreatePostPanel.module.scss';
import SubmitButton from '../SubmitButton/SubmitButton';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStoreType } from '../../store';
import { useTranslation } from 'react-i18next';

const CreatePostPanel = () => {
  const isLogged = useSelector((state: IStoreType) => state.profileReducer.isLogged);
  const { t } = useTranslation();

  return (
    <div className={styles.CreatePostPanel}>
      {isLogged && (
        <>
          <div className={styles.CreatePostPanel__text}>
            {t('Wanna add new post?')} <b style={{ color: 'blue' }}>{t('Click')}</b> {t('button')}.
          </div>
          <Link to='/post/add'>
            <SubmitButton type='button' text='Add post' />
          </Link>
        </>
      )}
      {!isLogged && (
        <>
          <div className={styles.CreatePostPanel__text}>{t('Wanna add new post?')}</div>
          <div className={styles.CreatePostPanel__text}>
            <Link to='/register'>
              <SubmitButton text='Sign up' type='button' />
            </Link>{' '}
            {t('or')}{' '}
            <Link to='/login'>
              <SubmitButton type='button' text='Sign in' />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePostPanel;
