import React, { useEffect } from 'react';
import styles from './Posts.module.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import ListPosts from '../../components/ListPosts/ListPosts';
import { useDispatch, useSelector } from 'react-redux';
import { getManyPostsAction } from './actions';
import { IStoreType } from '../../store';

const MainPage = () => {
  const dispatcher = useDispatch();

  const posts = useSelector((state: IStoreType) => state.postsReducer.posts);

  useEffect(() => {
    dispatcher(getManyPostsAction(100));
  }, [dispatcher]);

  return (
    <div className={styles.MainPage}>
      <SearchBar />
      <ListPosts posts={posts} />
    </div>
  );
};

export default MainPage;
