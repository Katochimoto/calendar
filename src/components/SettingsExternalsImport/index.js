import styles from './index.less'

export default function SettingsExternalsImport ({ calendars, importICS }) {

  function onSubmit (event) {
    event.preventDefault();
    const data = new FormData(event.target);

    importICS(data);
    return false;
  }

  return (
    <div className={styles.SettingsExternalsImport}>
      <h1 className={styles.SettingsExternalsImport_Title}>
        Импорт календарей
      </h1>

      <p>
        Для импортирования календаря по URL нужно ввести его адрес.
        Календарь должен быть в формате ICS.
      </p>

      <form onsubmit={onSubmit} method="post">
        <label for="SettingsExternalsImport_name">
          <span>Календарь:</span>

          <input name="color"
            type="color" />

          <input id="SettingsExternalsImport_name"
            name="name"
            autofocus
            required
            placeholder="название календаря" />
        </label>

        <label>
          <span>Адрес:</span>
          <input name="url"
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
