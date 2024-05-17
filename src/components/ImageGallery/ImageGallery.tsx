import { Image } from '../../App/App.types.tsx';

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (imageUrl: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <div>
      {images.map((image) => (
        <img
          key={image.id}
          src={image.urls.regular}
          alt={image.alt_description || 'Image'}
          onClick={() => onImageClick(image.urls.regular)}
        />
      ))}
    </div>
  );
};

export default ImageGallery;