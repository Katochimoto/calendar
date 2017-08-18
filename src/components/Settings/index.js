import { Route, NavLink } from 'react-router-dom';
import SettingsAccounts from '../../containers/SettingsAccounts';

import styles from './index.less';

export default function Settings ({ match }) {
  return (
    <div className={styles.Settings}>
      <div className={styles.Settings_Aside}>
        <div className={styles.Settings_Menu}>
          <NavLink
            className={styles.Settings_Menu_Item}
            activeClassName={styles.Settings_Menu_Item__active}
            to={`${match.url}`}
            exact>
            Общие
          </NavLink>
          <NavLink
            className={styles.Settings_Menu_Item}
            activeClassName={styles.Settings_Menu_Item__active}
            to={`${match.url}/accounts`}
            exact>
            Аккаунты
          </NavLink>
          <NavLink
            className={styles.Settings_Menu_Item}
            activeClassName={styles.Settings_Menu_Item__active}
            to={`${match.url}/main2`}
            exact>
            Защита и безопасность
          </NavLink>
        </div>
      </div>

      <div className={styles.Settings_Body}>
        <Route exact path={`${match.url}`} render={() => (
          <div>1</div>
        )} />
        <Route exact path={`${match.url}/accounts`} render={() => (
          <SettingsAccounts />
        )} />
        <Route exact path={`${match.url}/main2`} render={() => (
          <div>3</div>
        )} />
      </div>
    </div>
  );
}
