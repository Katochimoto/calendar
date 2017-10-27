import React from 'react';
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
// import { BrowserRouter as Router } from 'react-router-dom'
// import { MemoryRouter as Router } from 'react-router-dom'
import App from '../App'
import configureStore from '../../store'

const { store, persistor } = configureStore()

window.__store__ = store;

export default class AppProvider extends React.Component {

  constructor () {
    super()
    this.state = {
      bootstrapped: false,
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextState.bootstrapped !== this.state.bootstrapped
    )
  }

  componentDidMount () {
    this.handlePersistorState()
    this._unsubscribe = persistor.subscribe(() => this.handlePersistorState())
  }

  componentWillUnmount () {
    this._unsubscribe && this._unsubscribe()
  }

  handlePersistorState () {
    const { bootstrapped } = persistor.getState()
    if (bootstrapped) {
      this.setState({ bootstrapped: true })
      this._unsubscribe && this._unsubscribe()
    }
  }

  render () {
    if (!this.state.bootstrapped) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    )
  }
}
