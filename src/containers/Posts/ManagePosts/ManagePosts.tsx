import React, { useEffect } from 'react';
import styles from './ManagePosts.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreType } from '../../../store';
import { forwardTo } from '../../../lib/history';
import { getUsersPostsAction } from '../actions';
import ListPosts from '../../../components/ListPosts/ListPosts';
import { useTranslation } from 'react-i18next';

const ManagePosts = () => {
  const isLogged = useSelector((state: IStoreType) => state.profileReducer.isLogged);
  const user = useSelector((state: IStoreType) => state.profileReducer.user);
  const usersPosts = useSelector((state: IStoreType) => state.postsReducer.posts);

  const { t } = useTranslation();

  const dispatcher = useDispatch();

  useEffect(() => {
    if (!isLogged) forwardTo('/');
  }, [isLogged]);

  useEffect(() => {
    dispatcher(getUsersPostsAction(user.login));
  }, [dispatcher, user.login]);

  return (
    <div className={styles.ManagePosts}>
      <div className={styles.ManagePosts__title}>{t('Manage posts')}</div>
      <ListPosts type='edit' posts={usersPosts} />
    </div>
  );
};

export default ManagePosts;
