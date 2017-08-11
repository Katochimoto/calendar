import styles from './index.less';

export default function SettingsImport () {
  const onClick = function () {

  };

  return (
    <div className={styles.SettingsImport}>
      <h1>Импорт календарей</h1>

      <button onclick={onClick}>
        Connect
      </button>
    </div>
  );
}
