import { NavLink } from 'react-router-dom';

import Icon from '../Icon';

import styles from './index.less'
import stylesTypography from '../../style/typography.less'

export default function SettingsExternals ({ externals, match }) {

  return (
    <div className={styles.SettingsExternals}>
      <h1 className={stylesTypography.Header}>
        Внешние календари
      </h1>

      <NavLink
        to={`${match.url}/import`}
        exact>
        Импорт календарей
      </NavLink>

      <ul className={styles.ListGroup}>
        {externals.map(item => (
          <li key={item.id} className={styles.ListGroup_Item}>
            <NavLink
              to={`${match.url}/import/${item.id}`}
              exact>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
<Icon type="cog"
              size="xs"
              color={item.color}
              className={styles.ListGroup_Icon} />

            {item.color}
            /
            / {item.source} active
*/
