import  { FC, MouseEventHandler } from 'react';
import styles from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className={styles.loadMoreBtnContainer}>
      <button className={styles.loadMoreBtn} onClick={onClick}>Load more</button>
    </div>
  );
};

export default LoadMoreBtn;