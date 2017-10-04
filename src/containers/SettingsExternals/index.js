import { connect } from 'react-redux'
import SettingsExternals from '../../components/SettingsExternals'

const mapStateToProps = (state) => {
  return {
    externals: state.calendars.filter(item => Boolean(item.source))
  }
}

const mapDispatchToProps = () => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsExternals)
