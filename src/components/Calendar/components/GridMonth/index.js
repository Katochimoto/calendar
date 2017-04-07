import { Component } from '../../utils/Component';

import styles from './index.less';

export default class GridMonth extends Component {

  shouldComponentUpdate () {
    return false;
  }

  getRect () {
    return {
      scrollHeight: 0,
      scrollWidth: 0
    }
  }

  render () {
    return (
      <table className={styles.calendar_GridMonth}>
        <col width="100%" valign="top" />
        <thead>
          <tr>
            <td className={styles.calendar_GridMonth_Header}>
              1
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.calendar_GridMonth_Content}>
              2
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
