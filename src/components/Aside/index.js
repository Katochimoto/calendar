import { NavLink } from 'react-router-dom';
import Icon from '../Icon';

import styles from './index.less';

const Aside = () => (
  <div className={styles.Aside}>
    <div className={styles.Aside_Header}></div>

    <nav className={styles.Aside_Menu}>
      <ul className={styles.List}>
        <li className={styles.List_Header}>
          <span>Google</span>
        </li>
        <li className={styles.List_Item}>
          <span className={styles.List_Item_Text}>123</span>
          <span className={styles.List_Item_Controls}>
            <a className={styles.List_Item_Controls_Item}><Icon type="cog" size="xs" /></a>
            <a className={styles.List_Item_Controls_Item}><Icon type="cog" size="xs" /></a>
          </span>
        </li>
        <li className={styles.List_Item}>
          <span className={styles.List_Item_Text}>123</span>
        </li>
        <li className={styles.List_Header}>
          <span>iCloud</span>
        </li>
        <li className={styles.List_Item}>
          <span className={styles.List_Item_Text}>123</span>
        </li>
        <li className={styles.List_Header}>
          <span>Другое</span>
        </li>
        <li className={styles.List_Item}>
          <span className={styles.List_Item_Text}>123</span>
        </li>
      </ul>
    </nav>

    <nav className={styles.Aside_Bottom}>
      <div className={`${styles.BottomMenu}`}>
        <a className={styles.BottomMenu_Item}><Icon type="calendar" /></a>
        <a className={styles.BottomMenu_Item} title="Отправить отзыв"><Icon type="info" /></a>
        <NavLink
          className={styles.BottomMenu_Item}
          activeClassName={styles.BottomMenu_Item__active}
          to="/settings"
          title="Настройки">

          <Icon type="cog" />
        </NavLink>
      </div>
    </nav>
  </div>
);

export default Aside;
