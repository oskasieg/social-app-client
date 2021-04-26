import React, { useState } from 'react';
import { IPostProps } from './types';
import styles from './Post.module.scss';
import { useTranslation } from 'react-i18next';
import { IComment, ILike } from '../../containers/Posts/types';
import GalerryPopup from '../GalleryPopup/GalleryPopup';
import LikesPopup from '../LikesPopup/LikesPopup';
import { useDispatch, useSelector } from 'react-redux';
import like from '../../assets/like.svg';
import unlike from '../../assets/unlike.svg';
import { IStoreType } from '../../store';
import { editPostAction, deletePostAction } from '../../containers/Posts/actions';
import { showNotification } from '../../lib/notifications';
import avatar from '../../assets/avatar.png';
import { Link } from 'react-router-dom';
import CancelButton from '../CancelButton/CancelButton';
import SubmitButton from '../SubmitButton/SubmitButton';
import Popup from '../Popup/Popup';

const Post = ({ post, type }: IPostProps) => {
  const { t } = useTranslation();

  const componentType = type;

  const dispatcher = useDispatch();

  const user = useSelector((state: IStoreType) => state.profileReducer.user);
  const isLogged = useSelector((state: IStoreType) => state.profileReducer.isLogged);

  const [commentsVisible, setCommentsVisible] = useState<boolean>(false);
  const [galleryPopupVisible, setGalleryPopupVisible] = useState<boolean>(false);
  const [likesPopupVisible, setLikesPopupVisible] = useState<boolean>(false);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  const [comment, setComment] = useState<string>('');

  const getDate = (date: Date) => {
    const result1 = date.toString().substr(0, date.toString().indexOf('T'));
    const result2 = date.toString().substr(date.toString().indexOf('T') + 1, 8);

    return result1 + ' ' + result2;
  };

  const likeAction = (type: string) => {
    if (componentType === 'edit') return;

    if (isLogged) {
      const likeExist = post.likes.find((like: ILike) => like.author === user.login);

      if (!likeExist) {
        if (type === 'plus') {
          post.likes.push({ author: user.login, kind: 'plus', avatar: user.avatar });
        }

        if (type === 'minus') {
          post.likes.push({ author: user.login, kind: 'minus', avatar: user.avatar });
        }
        dispatcher(editPostAction(post, 'like'));
        return;
      }

      if (likeExist) {
        const like = likeExist;

        if (like.kind !== type) {
          post.likes.forEach((like: ILike) => {
            if (like.author === user.login) {
              like.kind = type;
            }
          });
          dispatcher(editPostAction(post, 'like'));
          return;
        }

        if (like.kind === type) {
          const index = post.likes.indexOf(like);
          post.likes.splice(index, 3);
          dispatcher(editPostAction(post, 'like'));
          return;
        }
      }
    } else {
      showNotification('warning', 'Warning', 'To add likes you must sign in!');
    }
  };

  const commentAction = () => {
    if (isLogged && comment.length > 0) {
      post.comments.push({ author: user.login, text: comment, avatar: user.avatar, createdAt: new Date() });
      dispatcher(editPostAction(post, 'comment'));
      setComment('');
    } else if (comment.length === 0) {
      return;
    } else {
      showNotification('warning', 'Warning', 'To add comments you must sign in!');
    }
  };

  const deletePost = () => {
    dispatcher(deletePostAction(user.login, post.title));
  };

  return (
    <div className={styles.Post}>
      {galleryPopupVisible && post.photos.length > 0 && (
        <GalerryPopup photos={post.photos} visible={galleryPopupVisible} handleClose={() => setGalleryPopupVisible(false)} />
      )}

      {likesPopupVisible && post.likes.length > 0 && (
        <LikesPopup likes={post.likes} visible={likesPopupVisible} handleClose={() => setLikesPopupVisible(false)} />
      )}

      {popupVisible && <Popup visible={popupVisible} handleClose={() => setPopupVisible(false)} handleSubmit={deletePost} />}

      <div className={styles.Post__header}>
        {type === 'default' && (
          <>
            <div className={styles.Post__left}>
              {t('User')} <span style={{ fontWeight: 'bold', margin: '0 0.2rem' }}>{post.authorLogin}</span> {t('added a new post.')}
            </div>
            <div className={styles.Post__right}>{getDate(post.createdAt)}</div>
          </>
        )}

        {type === 'edit' && (
          <>
            <div className={styles.Post__button}>
              <Link to={`/post/edit/${post.title}`}>
                <SubmitButton type='button' text='Edit' />
              </Link>
            </div>
            <div className={styles.Post__button}>
              <CancelButton onClick={() => setPopupVisible(true)} type='button' text='Delete' />
            </div>
          </>
        )}
      </div>

      <div className={styles.Post__title}>{post.title}</div>
      <div className={styles.Post__content}>{post.text}</div>

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
        <div className={styles.Post__likes}>
          <img
            style={post.likes.find((like: ILike) => like.author === user.login)?.kind === 'minus' ? { opacity: '0.5' } : {}}
            onClick={() => {
              if (type === 'default') likeAction('plus');
            }}
            className={styles.Post__like}
            src={like}
            alt='like'
          />
          {type === 'default' && (
            <img
              style={post.likes.find((like: ILike) => like.author === user.login)?.kind === 'plus' ? { opacity: '0.5' } : {}}
              onClick={() => likeAction('minus')}
              className={styles.Post__like}
              src={unlike}
              alt='unlike'
            />
          )}
          <div
            className={styles.Post__likesButton}
            style={post.sumLikes < 0 ? { color: 'red' } : { color: 'green' }}
            onClick={() => {
              if (post.likes.length > 0) setLikesPopupVisible(true);
            }}
          >
            {post.sumLikes}
          </div>
        </div>

        <div
          className={styles.Post__commentsButton}
          onClick={() => {
            setCommentsVisible(!commentsVisible);
          }}
        >
          {commentsVisible ? t('Hide comments') : t('Show comments')} ({post.comments.length})
        </div>
      </div>

      {commentsVisible && (
        <>
          {componentType === 'default' && (
            <div className={styles.Post__addComment}>
              <div className={styles.Post__commentTitle}>{t('Add comment')}:</div>
              <textarea
                value={comment}
                className={styles.Post__textarea}
                onChange={(e: React.FormEvent<HTMLTextAreaElement>) => setComment(e.currentTarget.value)}
              />
              <SubmitButton onClick={() => commentAction()} type='button' text='Send' />
            </div>
          )}
          <div className={styles.Post__comments}>
            {post.comments.map((comment: IComment, index: number) => (
              <div key={index} className={styles.Post__comment}>
                <div className={styles.Post__author}>
                  <Link
                    style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black' }}
                    to={`/profile/${comment.author}`}
                  >
                    <img src={comment.avatar ? comment.avatar : avatar} className={styles.Post__avatar} alt='avatar' />
                    {comment.author}
                  </Link>
                </div>
                <div className={styles.Post__text}>{comment.text}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
