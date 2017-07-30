import styles from './index.less';

export default function Icon ({ type }) {
  return (
    <svg className={`${styles.Icon} ${styles.Icon}_${type}`}>
      <use href={`#icon-${type}`}></use>
    </svg>
  );
}
