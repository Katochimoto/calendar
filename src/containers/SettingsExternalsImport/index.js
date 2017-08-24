import { connect } from 'react-redux'
import SettingsExternalsImport from '../../components/SettingsExternalsImport'

const mapStateToProps = (state) => {
  return {
    externals: state.externals
  }
}

const mapDispatchToProps = () => {
  return {
    onSubmitImportICS: (event) => {
      const data = new FormData(event.target);
      console.log('>>>', data);
      event.preventDefault();
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsExternalsImport)
