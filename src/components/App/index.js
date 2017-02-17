import Calendar from './../Calendar';

import styles from './index.less';

const App = () => (
  <div className={styles.app}>
    <Calendar
      bindChangeEvents={bindChangeEvents}
      onChangeEvents={onChangeEvents}/>
  </div>
);

export default App;

function bindChangeEvents () { // callback
  // callback();
}

function onChangeEvents () { // action, payload

}
