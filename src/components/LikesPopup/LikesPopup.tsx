import React from 'react';
import styles from './LikesPopup.module.scss';
import { ILikesPopupProps } from './types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useTranslation } from 'react-i18next';
import { ILike } from '../../containers/Posts/types';
import avatar from '../../assets/avatar.png';
import { Link } from 'react-router-dom';

const LikesPopup = ({ likes, visible, handleClose }: ILikesPopupProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={styles.LikesPopup}
        open={visible}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={visible}>
          <div className={styles.LikesPopup__container}>
            <div className={styles.LikesPopup__title}>{t('Reactions from users')}:</div>
            {likes.map((like: ILike, index: number) => (
              <div key={index} className={styles.LikesPopup__like}>
                <div className={styles.LikesPopup__user}>
                  <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }} to={`/profile/${like.author}`}>
                    <img className={styles.LikesPopup__avatar} alt='avatar' src={like.avatar ? like.avatar : avatar} /> {like.author}
                  </Link>
                </div>
                <div className={styles.LikesPopup__type} style={like.kind === 'plus' ? { color: 'green' } : { color: 'red' }}>
                  {like.kind === 'plus' && '+'}
                  {like.kind === 'minus' && '-'}
                </div>
              </div>
            ))}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default LikesPopup;
