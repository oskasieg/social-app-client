import React, { useEffect } from 'react';
import styles from './Posts.module.scss';
import ListPosts from '../../components/ListPosts/ListPosts';
import { useDispatch, useSelector } from 'react-redux';
import { getManyPostsAction } from './actions';
import { IStoreType } from '../../store';
import CreatePostPanel from '../../components/SearchBar/CreatePostPanel';

const MainPage = () => {
  const dispatcher = useDispatch();

  const posts = useSelector((state: IStoreType) => state.postsReducer.posts);

  useEffect(() => {
    dispatcher(getManyPostsAction(100));
  }, [dispatcher]);

  return (
    <div className={styles.Posts}>
      <CreatePostPanel />
      <ListPosts type='default' posts={posts} />
    </div>
  );
};

export default MainPage;
