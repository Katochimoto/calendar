import styles from './index.less';

export default function Icon () {
  return (
    <svg className={`${styles.Icon} icon-close`}>
      <use href="#icon-close"></use>
    </svg>
  );
}
