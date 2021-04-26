import React from 'react';
import styles from './Popup.module.scss';
import { IPopupProps } from './types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useTranslation } from 'react-i18next';

const Popup = ({ visible, handleClose, handleSubmit }: IPopupProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={styles.Popup}
        open={visible}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={visible}>
          <div className={styles.Popup__container}>
            <div className={styles.Popup__title}>{t('Are you sure?')}</div>
            <div className={styles.Popup__buttons}>
              <button style={{ color: 'blue' }} className={styles.Popup__button} type='button' onClick={handleSubmit}>
                {t('Yes')}
              </button>
              <button style={{ color: 'red' }} className={styles.Popup__button} type='button' onClick={handleClose}>
                {t('No')}
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Popup;
