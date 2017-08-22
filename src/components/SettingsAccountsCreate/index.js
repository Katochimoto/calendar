import styles from './index.less'

export default function SettingsAccountsCreate () {

  return (
    <div className={styles.SettingsAccountsCreate}>
      <h1 className={styles.SettingsAccountsCreate_Title}>
        Добавить учетную запись программы "CalDAV"
      </h1>

      <div className={styles.SettingsAccountsCreate_Form}>
        <label className={styles.SettingsAccountsCreate_Form_Row}>
          <span className={styles.SettingsAccountsCreate_Form_Label}>Тип учетной записи</span>
          <select className={styles.SettingsAccountsCreate_Form_Control}>
            <option>автоматически</option>
            <option>вручную</option>
            <option>дополнительно</option>
          </select>
        </label>

        {/* автоматически */}
        <label className={styles.SettingsAccountsCreate_Form_Row}>
          <span className={styles.SettingsAccountsCreate_Form_Label}>Адрес e-mail:</span>
          <input className={styles.SettingsAccountsCreate_Form_Control} placeholder="name@example.com" />
        </label>

        <label className={styles.SettingsAccountsCreate_Form_Row}>
          <span className={styles.SettingsAccountsCreate_Form_Label}>Пароль:</span>
          <input className={styles.SettingsAccountsCreate_Form_Control} placeholder="Обязательно" />
        </label>
        {/* /автоматически */}

        {/* вручную */}
        <label className={styles.SettingsAccountsCreate_Form_Row}>
          <span className={styles.SettingsAccountsCreate_Form_Label}>Имя пользователя:</span>
          <input className={styles.SettingsAccountsCreate_Form_Control} placeholder="name@example.com" />
        </label>

        <label className={styles.SettingsAccountsCreate_Form_Row}>
          <span className={styles.SettingsAccountsCreate_Form_Label}>Пароль:</span>
          <input className={styles.SettingsAccountsCreate_Form_Control} placeholder="Обязательно" />
        </label>

        <label className={styles.SettingsAccountsCreate_Form_Row}>
          <span className={styles.SettingsAccountsCreate_Form_Label}>Адрес сервера:</span>
          <input className={styles.SettingsAccountsCreate_Form_Control} placeholder="example.com" />
        </label>
        {/* /вручную */}

        {/* дополнительно */}
        <label className={styles.SettingsAccountsCreate_Form_Row}>
          <span className={styles.SettingsAccountsCreate_Form_Label}>Имя пользователя:</span>
          <input className={styles.SettingsAccountsCreate_Form_Control} placeholder="name@example.com" />
        </label>

        <label className={styles.SettingsAccountsCreate_Form_Row}>
          <span className={styles.SettingsAccountsCreate_Form_Label}>Пароль:</span>
          <input className={styles.SettingsAccountsCreate_Form_Control} placeholder="Обязательно" />
        </label>

        <label className={styles.SettingsAccountsCreate_Form_Row}>
          <span className={styles.SettingsAccountsCreate_Form_Label}>Адрес сервера:</span>
          <input className={styles.SettingsAccountsCreate_Form_Control} placeholder="example.com" />
        </label>

        <label className={styles.SettingsAccountsCreate_Form_Row}>
          <span className={styles.SettingsAccountsCreate_Form_Label}>Путь к серверу:</span>
          <input className={styles.SettingsAccountsCreate_Form_Control} placeholder="/calendars/user/" />
        </label>

        <label className={styles.SettingsAccountsCreate_Form_Row}>
          <span className={styles.SettingsAccountsCreate_Form_Label}>Порт:</span>
          <input className={styles.SettingsAccountsCreate_Form_Control} />
        </label>

        <label className={styles.SettingsAccountsCreate_Form_Row}>
          <span className={styles.SettingsAccountsCreate_Form_Label}>Использовать SSL:</span>
          <input className={styles.SettingsAccountsCreate_Form_Control} type="checkbox" checked />
        </label>

        <label className={styles.SettingsAccountsCreate_Form_Row}>
          <span className={styles.SettingsAccountsCreate_Form_Label}>Использовать Kerberos v5 для аутентификации:</span>
          <input className={styles.SettingsAccountsCreate_Form_Control} type="checkbox" />
        </label>
        {/* /дополнительно */}
      </div>
    </div>
  );
}
