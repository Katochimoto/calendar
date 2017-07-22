import { Link } from 'react-router-dom';

import styles from './index.less';

const Navbar = () => (
  <div className={styles.Navbar}>
    <ul className={styles.Nav}>
      <li className={styles.Nav_Item}>
        <Link className={styles.Nav_Link} to="/">Main</Link>
      </li>
      <li className={styles.Nav_Item}>
        <Link className={styles.Nav_Link} to="/about">About</Link>
      </li>
      <li className={styles.Nav_Item}>
        <Link className={styles.Nav_Link} to="/topics">Topics</Link>
      </li>
    </ul>
  </div>
);

export default Navbar;
