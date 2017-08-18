import styles from './index.less'

export default function SettingsAccounts ({ accounts, onClickCreate }) {

  return (
    <div className={styles.SettingsAccounts}>
      <h1 className={styles.SettingsAccounts_Title}>Аккаунты</h1>

      <button onclick={onClickCreate}>
        Create
      </button>
    </div>
  );
}
