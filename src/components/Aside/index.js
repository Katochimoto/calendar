import Icon from '../Icon';

import styles from './index.less';

const Aside = () => (
  <div className={styles.Aside}>
    <div className={styles.Aside_Header}></div>

    <nav className={styles.Aside_Menu}>
      <ul className={styles.List}>
        <li className={styles.List_Header}>
          <span>Личные</span>
        </li>
        <li>
          <a className={styles.List_Item}>
            <span className={styles.List_Item_Text}>123</span>
          </a>
        </li>
        <li className={styles.List_Header}>
          <span>События</span>
        </li>
        <li>
          <a className={styles.List_Item}>
            <span className={styles.List_Item_Text}>123</span>
          </a>
        </li>
      </ul>
    </nav>

    <nav className={styles.Aside_Bottom}>
      <ul className={styles.List}>
        <li>
          <a className={styles.List_Item}>
            <Icon />
            <span className={styles.List_Item_Text}>Отправить отзыв</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
);

export default Aside;
