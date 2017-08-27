import Icon from '../Icon';

import styles from './index.less';

export default function CalendarControls () {
  return (
    <div class={styles.CalendarControls}>
      <div class={styles.CalendarControls_Item}>prev</div>
      <div class={styles.CalendarControls_Group}>
        <div class={styles.CalendarControls_Item}>home</div>
        <div class={styles.CalendarControls_Item} title="Настройки вида">
          <Icon type="cog" />
        </div>
      </div>
      <div class={styles.CalendarControls_Item}>next</div>
    </div>
  );
}
