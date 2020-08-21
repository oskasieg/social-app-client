import React from 'react';
import styles from './ListPosts.module.scss';
import { IListPostsProps } from './types';
import { IPost } from '../../containers/Posts/types';
import Post from './Post';

const ListPosts = ({ posts, type }: IListPostsProps) => {
  return (
    <div className={styles.ListPosts}>
      {posts.map((post: IPost, index: number) => (
        <Post key={index} post={post} type={type} />
      ))}
    </div>
  );
};

export default ListPosts;
