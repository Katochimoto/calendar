import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import styles from './index.less'
import stylesForm from '../../style/form.less'

const SettingsExternalsImport = ({
  externalsImportForm,
  importICS,
  resetExternalsImportForm,
  urlExternals,
}) => {

  if (externalsImportForm.success) {
    resetExternalsImportForm()
    return (
      <Redirect to={urlExternals} />
    )
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
        method="post"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.target);
          importICS(data);
          return false;
        }}>

        <label className={stylesForm.Form_Row} for="SettingsExternalsImport_name">
          <span className={stylesForm.Form_Label}>
            Календарь:
          </span>

          <div className={stylesForm.Form_ControlGroup}>
            <Field className={stylesForm.Form_Control_Color}
              component="input"
              name="color"
              type="color" />

            <Field className={stylesForm.Form_Control}
              component="input"
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

          <Field className={stylesForm.Form_Control}
            component="input"
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

            <button className={stylesForm.Form_Button}
              onClick={(event) => {
                event.preventDefault();
                resetExternalsImportForm()
                return false;
              }}>
              Отмена
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'SettingsExternalsImport'
})(SettingsExternalsImport)
