import React, { useEffect } from 'react';
import styles from './OtherProfile.module.scss';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import UserProfile from '../../../components/UserProfile/UserProfile';
import { IStoreType } from '../../../store';
import { RouteComponentProps } from 'react-router-dom';
import { getUserProfileAction } from '../actions';

type TParams = { login: string };

const OtherProfile = (props: RouteComponentProps<TParams>) => {
  const { t } = useTranslation();

  const dispatcher = useDispatch();

  const user = useSelector((state: IStoreType) => state.profileReducer.userProfile);

  useEffect(() => {
    dispatcher(getUserProfileAction(props.match.params.login));
  }, [dispatcher, props.match.params.login]);

  return (
    <div className={styles.OtherProfile}>
      <div className={styles.OtherProfile__title}>{t('Profile')}</div>
      <UserProfile user={user} />
    </div>
  );
};

export default OtherProfile;
