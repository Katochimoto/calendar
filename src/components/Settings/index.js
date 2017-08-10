import { Route, NavLink } from 'react-router-dom';

import styles from './index.less';

export default function Settings ({ match }) {
  return (
    <div className={styles.Settings}>
      <div className={styles.Settings_Menu}>
        <ul>
          <li><NavLink to={`${match.url}`}>1</NavLink></li>
          <li><NavLink to={`${match.url}/main1`}>2</NavLink></li>
          <li><NavLink to={`${match.url}/main2`}>3</NavLink></li>
        </ul>
      </div>
      <div className={styles.Settings_Body}>
        <Route exact path={`${match.url}`} render={() => (
          <div>1</div>
        )} />
        <Route exact path={`${match.url}/main1`} render={() => (
          <div>2</div>
        )} />
        <Route exact path={`${match.url}/main2`} render={() => (
          <div>3</div>
        )} />
      </div>
    </div>
  );
}
