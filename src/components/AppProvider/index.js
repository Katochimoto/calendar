import React from 'react';
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
// import { BrowserRouter as Router } from 'react-router-dom'
// import { MemoryRouter as Router } from 'react-router-dom'
import store, { persist } from '../../store'
import App from '../App'

window.__store__ = store;

export default class AppProvider extends React.Component {

  constructor () {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount () {
    persist(store, () => {
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
