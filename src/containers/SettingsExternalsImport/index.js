import { connect } from 'react-redux'
import store from '../../store'
import {
  importICS,
  resetExternalsImportForm,
} from '../../actions'

import SettingsExternalsImport from '../../components/SettingsExternalsImport'

const mapStateToProps = ({ externalsImportForm }) => {
  return {
    externalsImportForm
  }
}

const mapDispatchToProps = () => {
  return {
    importICS: formData => {
      store.dispatch(importICS(formData))
    },
    resetExternalsImportForm: () => {
      store.dispatch(resetExternalsImportForm())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsExternalsImport)
