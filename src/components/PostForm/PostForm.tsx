import React, { useState, useEffect, useRef } from 'react';
import styles from './PostForm.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreType } from '../../store';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IInterest } from '../../containers/Register/types';
import InterestCheckbox from '../InterestCheckbox/InterestCheckbox';
import SubmitButton from '../SubmitButton/SubmitButton';
import plus from '../../assets/plus.svg';
import { addPostAction, editPostAction } from '../../containers/Posts/actions';
import { IPostFormValues, IPostFormProps } from './types';
import { forwardTo } from '../../lib/history';

const PostForm = ({ type, post }: IPostFormProps) => {
  const dispatcher = useDispatch();

  const [firstPhoto, setFirstPhoto] = useState<string>('');
  const [secondPhoto, setSecondPhoto] = useState<string>('');
  const [thirdPhoto, setThirdPhoto] = useState<string>('');

  const firstPhotoRef = useRef<HTMLInputElement>(null);
  const secondPhotoRef = useRef<HTMLInputElement>(null);
  const thirdPhotoRef = useRef<HTMLInputElement>(null);

  const [tags, setTags] = useState<IInterest[]>([]);

  const { t } = useTranslation();

  const isLogged = useSelector((state: IStoreType) => state.profileReducer.isLogged);

  useEffect(() => {
    if (!isLogged) forwardTo('/');
  }, [isLogged]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch('https://oskasieg-social-app.herokuapp.com/interests');
      const json = await response.json();

      setTags(json);
    };

    fetchTags();
  }, []);

  const authorLogin = useSelector((state: IStoreType) => state.profileReducer.user.login);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required!')
      .min(5, t('Min. number of characters is 5.'))
      .max(20, t('Max. number of characters is 20.')),
    text: Yup.string()
      .required('Text is required!')
      .min(10, 'Min. number of characters is 10.')
      .max(200, 'Max. number of characters is 200.'),
  });

  const initialValues: IPostFormValues = {
    authorLogin: '',
    title: '',
    text: '',
    photos: [],
    tags: [],
    likes: [],
    sumLikes: 0,
    comments: [],
    createdAt: new Date(),
    editedAt: new Date(),
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (values.tags.length === 0) formik.setFieldError('tags', t('Min. number of tags is 1.'));
      else if (type === 'edit') {
        console.log(values.photos);
        dispatcher(editPostAction(values, 'edit'));
      } else dispatcher(addPostAction(values));
    },
  });

  const { handleChange, handleSubmit, setFieldTouched, values, errors, touched, setFieldValue } = formik;

  useEffect(() => {
    if (post && post.title) setFieldValue('title', post.title);
    if (post && post.text) setFieldValue('text', post.text);
    if (post && post.photos) setFieldValue('photos', post.photos);
    if (post && post.tags) setFieldValue('tags', post.tags);
    if (post && post.likes) setFieldValue('likes', post.likes);
    if (post && post.sumLikes) setFieldValue('sumLikes', post.sumLikes);
    if (post && post.comments) setFieldValue('comments', post.comments);
    if (post && post.createdAt) setFieldValue('createdAt', post.createdAt);
    if (post && post.editedAt) setFieldValue('editedAt', post.editedAt);
    // if (post && post.photos) {
    //   const photos = post.photos;
    //   if (photos[0]) setFirstPhoto(photos[0]);
    //   if (photos[1]) setSecondPhoto(photos[1]);
    //   if (photos[2]) setThirdPhoto(photos[2]);
    // }
  }, [post, setFieldValue]);

  useEffect(() => {
    setFieldValue('authorLogin', authorLogin);
  }, [authorLogin, setFieldValue]);

  const handlePhotoChange = (e: React.FormEvent<HTMLInputElement>, photoId: number) => {
    if (e.currentTarget.files) {
      if (photoId === 0) {
        setFirstPhoto(URL.createObjectURL(e.currentTarget.files[0]));
        let files: any = values.photos;
        files[0] = e.currentTarget.files[0];
        setFieldValue('photos', files);
      }

      if (photoId === 1) {
        setSecondPhoto(URL.createObjectURL(e.currentTarget.files[0]));
        let files: any = values.photos;
        files[1] = e.currentTarget.files[0];
        setFieldValue('photos', files);
      }

      if (photoId === 2) {
        setThirdPhoto(URL.createObjectURL(e.currentTarget.files[0]));
        let files: any = values.photos;
        files[2] = e.currentTarget.files[0];
        setFieldValue('photos', files);
      }
    }
  };

  const handlePhotoClick = (photoId: number) => {
    switch (photoId) {
      case 0: {
        if (firstPhotoRef.current !== null) firstPhotoRef.current.click();
        break;
      }
      case 1: {
        if (secondPhotoRef.current !== null) secondPhotoRef.current.click();
        break;
      }
      case 2: {
        if (thirdPhotoRef.current !== null) thirdPhotoRef.current.click();
        break;
      }
    }
  };

  return (
    <div className={styles.PostForm}>
      {type === 'edit' && <div className={styles.PostForm__title}>{t('Edit post form')}</div>}
      {type !== 'edit' && <div className={styles.PostForm__title}>{t('Post form')}</div>}

      <form onSubmit={handleSubmit} className={styles.PostForm__container}>
        <label htmlFor='title' className={styles.PostForm__label}>
          {t('Title')}
        </label>
        <input
          disabled={type === 'edit'}
          autoComplete='off'
          name='title'
          type='text'
          className={styles.PostForm__textInput}
          onChange={handleChange}
          onClick={() => setFieldTouched('title')}
          value={values.title}
        />
        <div className={styles.PostForm__error}>{errors.title && touched.title ? t(errors.title) : null}</div>

        <label htmlFor='text' className={styles.PostForm__label}>
          {t('Text')}
        </label>
        <textarea
          name='text'
          className={styles.PostForm__textarea}
          onChange={handleChange}
          onClick={() => setFieldTouched('text')}
          value={values.text}
        />
        <div className={styles.PostForm__error}>{errors.text && touched.text ? t(errors.text) : null}</div>

        <label htmlFor='photos' className={styles.PostForm__label}>
          {t('Photos')}
        </label>
        <div className={styles.PostForm__photos}>
          <div className={styles.PostForm__photo} onClick={() => handlePhotoClick(0)}>
            <img src={firstPhoto ? firstPhoto : plus} alt='postPhoto' />
          </div>
          <div className={styles.PostForm__photo} onClick={() => handlePhotoClick(1)}>
            <img src={secondPhoto ? secondPhoto : plus} alt='postPhoto' />
          </div>
          <div className={styles.PostForm__photo} onClick={() => handlePhotoClick(2)}>
            <img src={thirdPhoto ? thirdPhoto : plus} alt='postPhoto' />
          </div>
          <input
            type='file'
            ref={firstPhotoRef}
            style={{ display: 'none' }}
            onChange={(e: React.FormEvent<HTMLInputElement>) => handlePhotoChange(e, 0)}
          />
          <input
            type='file'
            ref={secondPhotoRef}
            style={{ display: 'none' }}
            onChange={(e: React.FormEvent<HTMLInputElement>) => handlePhotoChange(e, 1)}
          />
          <input
            type='file'
            ref={thirdPhotoRef}
            style={{ display: 'none' }}
            onChange={(e: React.FormEvent<HTMLInputElement>) => handlePhotoChange(e, 2)}
          />
        </div>
        <div className={styles.PostForm__error}></div>

        <label htmlFor='tags' className={styles.PostForm__label}>
          {t('Tags')}
        </label>
        <div className={styles.PostForm__tags} onClick={() => setFieldTouched('tags')}>
          {tags && tags.map((tag: IInterest) => <InterestCheckbox key={tag.name} value={tag.name} name='tags' onChange={handleChange} />)}
        </div>
        <div className={styles.PostForm__error}>{touched.tags && errors.tags ? errors.tags : null}</div>

        <div className={styles.PostForm__line} />

        {type === 'edit' && <SubmitButton type='submit' text='Save' />}
        {type !== 'edit' && <SubmitButton text='Add' type='submit' />}
      </form>
    </div>
  );
};

export default PostForm;
