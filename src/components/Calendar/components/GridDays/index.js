import { Component } from '../../utils/Component';
import wheel from '../../utils/wheel';
import resize from '../../utils/resize';
import InfiniteStore from '../../utils/InfiniteStore';
import GridDaysHeader from '../GridDaysHeader';
import GridDaysContent from '../GridDaysContent';

import styles from './index.less';

@wheel
@resize
export default class GridDays extends Component {
  constructor (props, context) {
    super(props, context);
    this._infiniteStore = new InfiniteStore();
  }

  shouldComponentUpdate () {
    return false;
  }

  getRect () {
    return this._contentComponent.getRect();
  }

  handleWheel (deltaX, deltaY) {
    this._infiniteStore.updateScroll(deltaX, deltaY);
  }

  handleWheelStop () {
    this._infiniteStore.updateScroll(0, 0);
  }

  handleResize () {
    this._infiniteStore.update(this.getRect());
  }

  render () {
    return (
      <table ref={rootNode => this._rootNode = rootNode}
        className={styles.calendar_GridDays}>

        <col width="100%" valign="top" />

        <thead>
          <tr>
            <td className={styles.calendar_GridDays_Header}>
              <GridDaysHeader
                infiniteStore={this._infiniteStore} />
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className={styles.calendar_GridDays_Content}>
              <GridDaysContent
                ref={component => this._contentComponent = component}
                infiniteStore={this._infiniteStore} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
