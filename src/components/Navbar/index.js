import { Link } from 'react-router-dom';

import styles from './index.less';

const Navbar = () => (
  <nav className={styles.Navbar}>
    <Link className={`${styles.Navbar_Tab} ${styles.Navbar_Tab__active}`} to="/">Main</Link>
    <Link className={styles.Navbar_Tab} to="/about">About</Link>
    <Link className={styles.Navbar_Tab} to="/topics">Topics</Link>
  </nav>
);

export default Navbar;
