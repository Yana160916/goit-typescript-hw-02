import { FC } from 'react';
import { Audio } from 'react-loader-spinner';

interface LoaderProps {
  height?: number;
  width?: number;
  color?: string;
  ariaLabel?: string;
}

const Loader: FC<LoaderProps> = ({
  height = 80,
  width = 80,
  color = "green",
  ariaLabel = "three-dots-loading",
}) => {
  return (
    <Audio
      height={height}
      width={width}
      color={color}
      ariaLabel={ariaLabel}
    />
  );
};

export default Loader;