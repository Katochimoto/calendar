import { NavLink } from 'react-router-dom';

import styles from './index.less';

export default function Navbar (props, context) {
  console.log(context);
  return (
    <nav className={styles.Navbar}>
      <NavLink className={styles.Navbar_Tab} to="/day" activeClassName={styles.Navbar_Tab__active}>
        День
      </NavLink>
      <NavLink className={styles.Navbar_Tab} to="/" exact activeClassName={styles.Navbar_Tab__active}>
        Неделя
      </NavLink>
      <NavLink className={styles.Navbar_Tab} to="/month" activeClassName={styles.Navbar_Tab__active}>
        Месяц
      </NavLink>
      <NavLink className={styles.Navbar_Tab} to="/year" activeClassName={styles.Navbar_Tab__active}>
        Год
      </NavLink>
      <NavLink className={styles.Navbar_Tab} to="/agenda" activeClassName={styles.Navbar_Tab__active}>
        Повестка
      </NavLink>
    </nav>
  );
}
