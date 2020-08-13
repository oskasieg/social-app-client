import React, { useState } from 'react';
import { IPostProps } from './types';
import styles from './Post.module.scss';
import { useTranslation } from 'react-i18next';
import { IComment } from '../../containers/Posts/types';
import GalerryPopup from '../GalleryPopup/GalleryPopup';
import LikesPopup from '../LikesPopup/LikesPopup';

const Post = ({ post }: IPostProps) => {
  const { t } = useTranslation();

  const [commentsVisible, setCommentsVisible] = useState<boolean>(false);
  const [galleryPopupVisible, setGalleryPopupVisible] = useState<boolean>(false);
  const [likesPopupVisible, setLikesPopupVisible] = useState<boolean>(false);

  const [comment, setComment] = useState<string>('');

  const getDate = (date: Date) => {
    const result1 = date.toString().substr(0, date.toString().indexOf('T'));
    const result2 = date.toString().substr(date.toString().indexOf('T') + 1, 8);

    return result1 + ' ' + result2;
  };

  return (
    <div className={styles.Post}>
      {galleryPopupVisible && post.photos.length > 0 && (
        <GalerryPopup photos={post.photos} visible={galleryPopupVisible} handleClose={() => setGalleryPopupVisible(false)} />
      )}

      {likesPopupVisible && post.likes.length > 0 && (
        <LikesPopup likes={post.likes} visible={likesPopupVisible} handleClose={() => setLikesPopupVisible(false)} />
      )}

      <div className={styles.Post__header}>
        <div className={styles.Post__left}>
          {t('User')} <span style={{ fontWeight: 'bold', margin: '0 0.2rem' }}>{post.authorLogin}</span> {t('added a new post.')}
        </div>
        <div className={styles.Post__right}>{getDate(post.createdAt)}</div>
      </div>

      <div className={styles.Post__title}>{post.title}</div>
      <div className={styles.Post__content}>
        Lorem ipsum – tekst składający się z łacińskich i quasi-łacińskich wyrazów, mający korzenie w klasycznej łacinie, wzorowany na
        fragmencie traktatu Cycerona „O granicach dobra i zła” napisanego w 45 p.n.e. Tekst jest stosowany do demonstracji krojów pisma,
      </div>

      {post.photos.length > 0 && (
        <div className={styles.Post__gallery} onClick={() => setGalleryPopupVisible(true)}>
          {post.photos.length === 1 && <img src={post.photos[0]} alt='gallery' className={styles.Post__singlePhoto} />}
          {post.photos.length > 1 && (
            <>
              <img src={post.photos[0]} alt='gallery' className={styles.Post__leftPhoto} />
              <img src={post.photos[1]} alt='gallery' className={styles.Post__rightPhoto} />
            </>
          )}
        </div>
      )}

      <div className={styles.Post__footer}>
        <div className={styles.Post__likes} onClick={() => setLikesPopupVisible(true)}>
          {post.sumLikes}
        </div>

        <div
          className={styles.Post__commentsButton}
          onClick={() => {
            if (post.comments.length > 0) setCommentsVisible(!commentsVisible);
          }}
        >
          {commentsVisible ? t('Hide comments') : t('Show comments')} ({post.comments.length})
        </div>
      </div>

      {commentsVisible && (
        <>
          <div className={styles.Post__comments}>
            {post.comments.map((comment: IComment, index: number) => (
              <div key={index} className={styles.Post__comment}>
                <div className={styles.Post__author}>
                  <img src={comment.avatar} className={styles.Post__avatar} alt='avatar' />
                  {comment.author}
                </div>
                <div className={styles.Post__text}>{comment.text}</div>
              </div>
            ))}
          </div>
          <div className={styles.Post__addComment}>
            <div className={styles.Post__commentTitle}>{t('Add comment')}:</div>
            <textarea
              value={comment}
              className={styles.Post__textarea}
              onChange={(e: React.FormEvent<HTMLTextAreaElement>) => setComment(e.currentTarget.value)}
            />
            <button type='button'>{t('Send')}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
