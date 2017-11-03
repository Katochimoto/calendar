import React from 'react';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import App from '../App'
import configureStore from '../../store'

const {
  history,
  persistor,
  store,
} = configureStore()

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
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    )
  }
}
