import { Route } from 'react-router-dom';

import Aside from '../Aside';
import Navbar from '../Navbar';
import Settings from '../Settings';
import CalendarGrid from '../CalendarGrid';

import styles from './index.less';

// https://github.com/material-components/material-components-web
// https://material.io/components/web/catalog/toolbar/
// https://prateekbh.github.io/preact-material-components/#/component/toolbar

// https://github.com/css-modules/css-modules/blob/master/docs/theming.md
// https://github.com/css-modules/postcss-icss-values/issues/6
// https://github.com/Semantic-Org/Semantic-UI-LESS
// https://semantic-ui.com/introduction/advanced-usage.html#less-only-distribution
// https://getuikit.com/docs/less


// http://flatfull.com/themes/flatkit/html/dashboard.0.html
// http://www.deeplearningbook.org/

// http://lesscss.org/3.x/tools/#frameworks-using-less-grid-systems
// http://flexboxgrid.com/

// !!!
// https://developers.google.com/identity/protocols/OAuth2UserAgent
// http://fontawesome.io/
// http://flatfull.com/themes/flatkit/html/setting.html

const App = () => (
  <div className={styles.App}>
    <Aside />
    <div className={styles.App_Content}>
      <header className={styles.App_Header}>
        <Navbar />
      </header>
      <div className={styles.App_Body}>
        <Route exact path="/" component={CalendarGrid} />
        <Route path="/settings" component={Settings} />
      </div>
    </div>
  </div>
);

export default App;
