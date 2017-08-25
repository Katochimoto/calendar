import { connect } from 'react-redux'
import store from '../../store'
import { importICS } from '../../actions'
import SettingsExternalsImport from '../../components/SettingsExternalsImport'

const mapStateToProps = (state) => {
  return {
    calendars: state.calendars
  }
}

const mapDispatchToProps = () => {
  return {
    importICS: formData => {
      store.dispatch(importICS(formData));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsExternalsImport)
