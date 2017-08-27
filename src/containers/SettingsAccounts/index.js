import { connect } from 'react-redux'
import SettingsAccounts from '../../components/SettingsAccounts'

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
)(SettingsAccounts)
