import React, { FC } from 'react';

interface ImageCardProps {
  imageUrl: string;
  altDescription: string;
  onClick: () => void;
}

const ImageCard: FC<ImageCardProps> = ({ imageUrl, altDescription, onClick }) => {
  return (
    <div onClick={onClick}>
      <img src={imageUrl} alt={altDescription} />
    </div>
  );
};

export default ImageCard;