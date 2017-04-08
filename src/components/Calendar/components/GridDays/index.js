import { Component } from '../../utils/Component';
import wheel from '../../utils/wheel';
import resize from '../../utils/resize';

import GridDaysHeader from '../GridDaysHeader';
import GridDaysContent from '../GridDaysContent';

import styles from './index.less';

@wheel
@resize
export default class GridDays extends Component {

  shouldComponentUpdate () {
    return false;
  }

  getRect () {
    return this._contentComponent.getRect();
  }

  handleWheel (deltaX, deltaY) {
    this.context.infiniteStore.updateScroll(deltaX, deltaY);
  }

  handleWheelStop () {
    this.context.infiniteStore.updateScroll(0, 0);
  }

  handleResize () {
    this.context.infiniteStore.update(this.getRect());
  }

  render () {
    return (
      <table ref={rootNode => this._rootNode = rootNode}
        className={styles.calendar_GridDays}>

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
              <GridDaysContent ref={component => this._contentComponent = component} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
