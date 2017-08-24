import styles from './index.less'

export default function SettingsExternalsImport ({ externals, onSubmitImportICS }) {

  return (
    <div className={styles.SettingsExternalsImport}>
      <h1 className={styles.SettingsExternalsImport_Title}>
        Импорт календарей
      </h1>

      <p>
        Для импортирования календаря по URL нужно ввести его адрес.
        Календарь должен быть в формате ICS.
      </p>

      <form onsubmit={onSubmitImportICS} method="post">
        <label for="name">
          <span>Календарь:</span>

          <input name="calendar_color"
            type="color" />

          <input name="calendar_name"
            id="name"
            autofocus
            required
            placeholder="название календаря" />
        </label>

        <label>
          <span>Адрес:</span>
          <input name="calendar_url"
            type="url"
            required
            placeholder="http://example.com/calendar.ics" />
        </label>

        <div>
          <button type="submit">
            Импортировать
          </button>
        </div>
      </form>

    </div>
  );
}
