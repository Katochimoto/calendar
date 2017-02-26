import Calendar from './../Calendar';

import styles from './index.less';

const App = () => (
  <div className={styles.app}>
    <Calendar
      handleChangeEvents={handleChangeEvents}
      uploadEvents={uploadEvents}/>
  </div>
);

export default App;

function handleChangeEvents () { // action, payload
}

function uploadEvents (interval, callback) {
  const dateBegin = interval[0]
  const dateEnd = interval[1] || dateBegin;

  setTimeout(callback, 500, {
    interval,
    events: [
      {
        id: 'qweqweqwe',
        dateBegin: `${dateBegin}T07:30:00`,
        dateEnd: `${dateEnd}T11:30:00`,
        //color: '',
        //title: '',
      }
    ]
  });
}
