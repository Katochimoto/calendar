import { NavLink } from 'react-router-dom';

import styles from './index.less'

export default function SettingsExternals ({ externals, match }) {

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

      <table>
        {externals.map(item => (
          <tr>
            <td>{item.color}</td>
            <td>{item.name}</td>
            <td>{item.source}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
