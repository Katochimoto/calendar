import classnames from 'classnames';
import styles from './index.less';

export default function Icon ({
  type,
  size = 's'
} = {}) {
  const classes = classnames({
    [ styles.Icon ]: true,
    [ styles[ `Icon-${type}` ] ]: true,
    [ styles[ `Icon_size_${size}` ] ]: true
  });

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={classes}>
      <use href={`#icon-${type}`}></use>
      <rect height="100%" width="100%" style="fill: transparent;"></rect>
    </svg>
  );
}
