import React from 'react';
import styles from '../ImageGallery/ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

interface ImageData {
  id: string;
  alt_description: string;
  urls: {
    small?: string; // Поле small тепер необов'язкове
    regular: string;
  };
}

interface ImageGalleryProps {
  images: ImageData[];
  onImageClick: (url: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={styles.imageGalleryContainer}>
      {images.map((image) => (
        <li key={image.id} className={styles.imageGalleryItem}>
          <ImageCard
            imageUrl={image.urls.small || image.urls.regular} // Використовуємо small, якщо він є, в іншому випадку використовуємо regular
            altDescription={image.alt_description}
            onClick={() => onImageClick(image.urls.regular)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;