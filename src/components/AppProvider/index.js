import React from 'react';
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
// import { BrowserRouter as Router } from 'react-router-dom'
// import { MemoryRouter as Router } from 'react-router-dom'
import store from '../../store'
import App from '../App'

window.__store__ = store;

export default class AppProvider extends React.Component {

  constructor () {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount () {
    persistStore(store, {
      whitelist: [
        'calendars'
      ],
      debounce: 100,
      keyPrefix: 'clnd.'
    }, () => {
      this.setState({ rehydrated: true })
    })
  }

  render () {
    if (!this.state.rehydrated) {
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
