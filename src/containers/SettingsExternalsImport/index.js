import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  importICS,
  resetExternalsImportForm,
} from '../../actions'

import SettingsExternalsImport from '../../components/SettingsExternalsImport'

const mapStateToProps = ({ externalsImportForm }) => ({
  externalsImportForm
})

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    importICS,
    resetExternalsImportForm,
  }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsExternalsImport)
