import { connect } from 'react-redux'
import SettingsExternals from '../../components/SettingsExternals'

const mapStateToProps = (state) => {
  return {
    externals: state.externals
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
)(SettingsExternals)
