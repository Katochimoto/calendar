import Aside from '../Aside';
import Navbar from '../Navbar';
import Body from '../Body';
import Calendar from '../Calendar';

import { offsetOnDay } from '../Calendar/utils/date';
import { Route, Link } from 'react-router-dom';

import styles from './index.less';

// https://github.com/material-components/material-components-web
// https://material.io/components/web/catalog/toolbar/
// https://prateekbh.github.io/preact-material-components/#/component/toolbar

const App = () => (
  <div className={styles.App}>
    <Aside />
    <div className={styles.App_Content}>
      <div className={styles.App_Header}>
        <Navbar />
      </div>
      <Body>
        <Route exact path="/" render={renderCalendar} />
      </Body>
    </div>
  </div>
);

export default App;

function renderCalendar (props) {
  return (
    <Calendar {...props} upload={uploadEvents} update={updateEvents} />
  );
}

function uploadEvents (interval: number[], callback: Function) {
  const events = generateEvents(interval);
  callback.call(this, null, interval, events);
}

function updateEvents (callback: Function) {
  // callback.call(this);
}

function generateEvents (interval) {
  const dateBegin = interval[0]
  const dateEnd = interval[1] || dateBegin;
  const events = [];
  let currentDate = dateBegin;

  while (currentDate <= dateEnd) {
    events.push(
      generateEvent([currentDate, currentDate]),
      generateEvent([currentDate, currentDate]),
      generateEvent([currentDate, currentDate]),
      generateEvent([currentDate, currentDate]),
      generateEvent([currentDate, currentDate])
    );
    currentDate = offsetOnDay(currentDate, 1);
  }

  events.sort((a, b) => {
    const ab = a.dateBegin;
    const bb = b.dateBegin;

    if (ab > bb) {
      return 1;
    } else if (ab < bb) {
      return -1;
    } else {
      const atb = a.timeBegin;
      const btb = b.timeBegin;

      if (atb > btb) {
        return 1;
      } else if (atb < btb) {
        return -1;
      } else {
        return 0;
      }
    }
  });

  return events;
}

function generateEvent (interval) {
  const dateBegin = interval[0]
  const dateEnd = interval[1] || dateBegin;
  const timeBegin = getRandomInt(0, 23 * 60);
  const timeEnd = getRandomInt(timeBegin + 30, 24 * 60);

  return {
    id: `${dateBegin}T${timeBegin}--${dateEnd}T${timeEnd}`,
    dateBegin: dateBegin,
    dateEnd: dateEnd,
    timeBegin: timeBegin * 60 * 1000,
    timeEnd: timeEnd * 60 * 1000,
    title: `${dateBegin} ${timeBegin}:${timeEnd}`,
    updated: Math.random() + 1
  };
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
