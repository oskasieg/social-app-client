import React, { useEffect } from 'react';
import styles from './EditPost.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { getPostByNameAction } from '../actions';
import PostForm from '../../../components/PostForm/PostForm';
import { IStoreType } from '../../../store';

type TParams = { title: string };

const EditPost = (props: RouteComponentProps<TParams>) => {
  const dispatcher = useDispatch();

  const post = useSelector((state: IStoreType) => state.postsReducer.post);

  useEffect(() => {
    dispatcher(getPostByNameAction(props.match.params.title));
  }, [dispatcher, props.match.params.title]);

  return <div className={styles.EditPost}>{post && <PostForm post={post} type='edit' />}</div>;
};

export default EditPost;
