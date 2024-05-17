
interface ImageCardProps {
  imageUrl: string;
  alt: string;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, alt, onClick }) => {
  return (
    <img
      src={imageUrl}
      alt={alt}
      onClick={onClick}
      style={{ cursor: 'pointer', maxWidth: '100%' }}
    />
  );
};

export default ImageCard;

