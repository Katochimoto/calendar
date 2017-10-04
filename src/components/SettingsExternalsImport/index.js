import styles from './index.less'
import stylesForm from '../../style/form.less'

export default function SettingsExternalsImport ({
  form,
  importICS
}) {

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

      <form className={stylesForm.Form}
        onSubmit={onSubmit}
        method="post">

        <label className={stylesForm.Form_Row} for="SettingsExternalsImport_name">
          <span className={stylesForm.Form_Label}>
            Календарь:
          </span>

          <div className={stylesForm.Form_ControlGroup}>
            <input className={stylesForm.Form_Control_Color}
              name="color"
              type="color" />

            <input className={stylesForm.Form_Control}
              id="SettingsExternalsImport_name"
              name="name"
              maxlength="100"
              autofocus
              required
              placeholder="название календаря" />
          </div>
        </label>

        <label className={stylesForm.Form_Row}>
          <span className={stylesForm.Form_Label}>
            Адрес:
          </span>

          <input className={stylesForm.Form_Control}
            name="source"
            type="url"
            required
            placeholder="http://example.com/calendar.ics" />
        </label>

        <div className={stylesForm.Form_Row}>
          <div className={stylesForm.Form_ControlGroup}>
            <button className={`${stylesForm.Form_Button} ${stylesForm.Form_Button__active}`} type="submit">
              Импортировать
            </button>

            <button className={stylesForm.Form_Button}>
              Отмена
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
