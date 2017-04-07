import { Component } from '../../utils/Component';
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
        <col width="100%" valign="top" />
        <thead>
          <tr>
            <td className={styles.calendar_GridDays_Header}>
              <GridDaysHeader />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.calendar_GridDays_Content}>
              <GridDaysContent ref={contentComponent => this._contentComponent = contentComponent} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
