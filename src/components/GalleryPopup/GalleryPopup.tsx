import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { IGalleryPopupProps } from './types';
import styles from './GalleryPopup.module.scss';

const GalleryPopup = ({ visible, photos, handleClose }: IGalleryPopupProps) => {
  const [activePhoto, setActivePhoto] = useState<string>(photos[0]);

  return (
    <>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={styles.GalleryPopup}
        open={visible}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={visible}>
          <div className={styles.GalleryPopup__container}>
            <img src={activePhoto} className={styles.GalleryPopup__photo} alt='gallery' />
            <div className={styles.GalleryPopup__photos}>
              {photos.map((photo: string, index: number) => (
                <img
                  key={index}
                  onClick={() => setActivePhoto(photo)}
                  className={activePhoto === photo ? styles.GalleryPopup__smallPhotoActive : styles.GalleryPopup__smallPhoto}
                  src={photos[index]}
                  alt='galleryPhoto'
                />
              ))}
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default GalleryPopup;
