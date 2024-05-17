import { FC, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  onRequestClose: () => void;
  views: number;
  description: string;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, imageUrl, onRequestClose, views, description }) => {
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt="Large version of the image" />
        <p className={styles.views}>Views: {views}</p>
        <p className={styles.description}>Description: {description}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;