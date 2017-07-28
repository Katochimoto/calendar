import { Link } from 'react-router-dom';

import styles from './index.less';

const Navbar = () => (
  <nav className={styles.Navbar}>
    <Link className={`${styles.Navbar_Tab} ${styles.Navbar_Tab__active}`} to="/">
      Неделя
    </Link>
    <Link className={styles.Navbar_Tab} to="/about">
      Месяц
    </Link>
    <Link className={styles.Navbar_Tab} to="/topics">
      Год
    </Link>
    <Link className={styles.Navbar_Tab} to="/topics">
      Повестка
    </Link>
  </nav>
);

export default Navbar;
