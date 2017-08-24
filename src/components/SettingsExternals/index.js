import { NavLink } from 'react-router-dom';

import styles from './index.less'

export default function SettingsExternals ({ externals, onClickCreate, match }) {

  return (
    <div className={styles.SettingsExternals}>
      <h1 className={styles.SettingsExternals_Title}>
        Внешние календари
      </h1>

      <NavLink
        to={`${match.url}/import`}
        exact>
        Импорт календарей
      </NavLink>

    </div>
  );
}
