import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  importICS,
  resetExternalsImportForm,
} from '../../actions'
import {
  calendarSelector
} from '../../selectors'

import SettingsExternalsImport from '../../components/SettingsExternalsImport'

const mapStateToProps = (state, { calendarId }) => ({
  externalsImportForm: state.externalsImportForm,
  formData: calendarId ? calendarSelector(state, calendarId) : {}
})

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    importICS,
    resetExternalsImportForm,
  }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: true
  }
)(SettingsExternalsImport)
