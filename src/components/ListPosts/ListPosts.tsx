import React from 'react';
import styles from './ListPosts.module.scss';
import { IListPostsProps } from './types';
import { IPost } from '../../containers/Posts/types';
import Post from './Post';
import { useTranslation } from 'react-i18next';
import SubmitButton from '../SubmitButton/SubmitButton';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStoreType } from '../../store';

const ListPosts = ({ posts }: IListPostsProps) => {
  const { t } = useTranslation();

  const isLogged = useSelector((state: IStoreType) => state.profileReducer.isLogged);

  return (
    <div className={styles.ListPosts}>
      <div className={styles.ListPosts__panel}>
        {isLogged && (
          <>
            <div className={styles.ListPosts__text}>
              {t('Wanna add new post?')} <b style={{ color: 'blue' }}>{t('Click')}</b> {t('button')}.
            </div>
            <Link to='/post'>
              <SubmitButton type='button' text='Add post' />
            </Link>
          </>
        )}
        {!isLogged && (
          <>
            <div className={styles.ListPosts__text}>{t('Wanna add new post?')}</div>
            <div className={styles.ListPosts__text}>
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
      {posts.map((post: IPost, index: number) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

export default ListPosts;
