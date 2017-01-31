/**
 *
 */

import { Component } from 'react';
import GridDaysHeader from '../GridDaysHeader';
import GridDaysContent from '../GridDaysContent';

import styles from './index.less';

export default class GridDays extends Component {

  shouldComponentUpdate () {
    return false;
  }

  getRect () {
    return this._contentComponent.getRect();
  }

  render () {
    return (
      <table className={styles.calendar_GridDays}>
        <tr className={styles.calendar_GridDays_Tr1}>
          <td className={styles.calendar_GridDays_Td1}>
            <GridDaysHeader />
          </td>
        </tr>
        <tr className={styles.calendar_GridDays_Tr2}>
          <td className={styles.calendar_GridDays_Td2}>
            <GridDaysContent ref={contentComponent => this._contentComponent = contentComponent} />
          </td>
        </tr>
      </table>
    );
  }
}
