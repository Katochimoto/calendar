import classnames from 'classnames';
import styles from './index.less';

export default function Icon ({
  className,
  color,
  size = 's',
  type,
} = {}) {
  const typeClass = `Icon-${type}`;
  const sizeClass = `Icon_size_${size}`;
  const classes = classnames({
    [ styles.Icon ]: true,
    [ styles[ typeClass ] ]: Boolean(styles[ typeClass ]),
    [ styles[ sizeClass ] ]: Boolean(styles[ sizeClass ]),
    [ className ]: Boolean(className)
  });

  const style = {};

  if (color) {
    style.color = color;
  }

  return (
    <svg xmlns="https://www.w3.org/2000/svg" className={classes} style={style}>
      <use href={`#icon-${type}`}></use>
      <rect height="100%" width="100%" style="fill: transparent;"></rect>
    </svg>
  );
}
