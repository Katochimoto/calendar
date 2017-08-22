import { NavLink } from 'react-router-dom';

import styles from './index.less'

export default function SettingsAccounts ({ accounts, onClickCreate, match }) {

  return (
    <div className={styles.SettingsAccounts}>
      <h1 className={styles.SettingsAccounts_Title}>Аккаунты</h1>

      <button onclick={onClickCreate}>
        Google
      </button>

      <button onclick={onClickCreate}>
        facebook
      </button>

      <button onclick={onClickCreate}>
        Yandex
      </button>

      <button onclick={onClickCreate}>
        Mail.Ru
      </button>

      <NavLink
        to={`${match.url}/create`}
        exact>
        Другая учетная запись CalDAV
      </NavLink>

      <ul>
        <li>qwe@asd.ru</li>
        <li>qwe@asd.ru</li>
        <li>qwe@asd.ru</li>
        <li>qwe@asd.ru</li>
      </ul>
    </div>
  );
}
