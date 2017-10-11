import {
  Route,
  Redirect,
  NavLink
} from 'react-router-dom'

import SettingsAccounts from '../../containers/SettingsAccounts'
import SettingsAccountsCreate from '../../containers/SettingsAccountsCreate'
import SettingsExternals from '../../containers/SettingsExternals'
import SettingsExternalsImport from '../../containers/SettingsExternalsImport'

import styles from './index.less'

export default function Settings ({ match }) {
  const test = true

  const urlAccounts = `${match.url}/accounts`
  const urlAccountsCreate = `${match.url}/accounts/create`
  const urlExternals = `${match.url}/externals`
  const urlExternalsImport = `${match.url}/externals/import`

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
            to={`${match.url}/accounts`}>
            Аккаунты
          </NavLink>
          <NavLink
            className={styles.Settings_Menu_Item}
            activeClassName={styles.Settings_Menu_Item__active}
            to={urlExternals}>
            Внешние календари
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
        <Route exact path={`${match.url}/main2`} render={() => (
          <div>3</div>
        )} />

        <Route exact path={urlAccounts} render={({ match }) => (
          <SettingsAccounts match={match} />
        )} />
        <Route exact path={urlAccountsCreate} render={() => (
          <SettingsAccountsCreate />
        )} />

        <Route exact path={urlExternals} render={({ match }) => (
          <SettingsExternals match={match} />
        )} />
        <Route exact path={urlExternalsImport} render={({ match }) => (
          test ? (
            <SettingsExternalsImport />
          ) : (
            <Redirect to={urlExternals} />
          )
        )} />
      </div>
    </div>
  )
}
