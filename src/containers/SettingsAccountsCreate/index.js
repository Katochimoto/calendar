import { connect } from 'react-redux'
import SettingsAccountsCreate from '../../components/SettingsAccountsCreate'

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts
  }
}

const mapDispatchToProps = () => {
  return {
    onClickCreate: () => {
      console.log('>>>');
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsAccountsCreate)
