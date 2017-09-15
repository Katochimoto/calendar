import { NavLink } from 'react-router-dom';

import Icon from '../Icon';

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

      <ul className={styles.ListGroup}>
        {externals.map(item => (
          <li className={styles.ListGroup_Item}>
            <Icon type="cog" size="xs" color={item.color} />

            {item.color}
            / {item.name}
            / {item.source}
          </li>
        ))}
      </ul>
    </div>
  );
}
