import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux'

import {
  routerMiddleware,
  routerReducer,
} from 'react-router-redux'

import {
  storage,
  persistReducer,
  persistStore,
} from 'redux-persist'

import createSagaMiddleware from 'redux-saga'

import {
  reducer as reduxFormReducer,
} from 'redux-form'

import {
  createHashHistory as createHistory,
} from 'history'

import * as reducers from '../reducers'
import sagas from '../sagas'

export default function configureStore () {
  const history = createHistory()
  const _routerMiddleware = routerMiddleware(history)
  const _sagaMiddleware = createSagaMiddleware()

  const app = persistReducer({
    storage,
    key: 'root',
    keyPrefix: 'clnd.',
    throttle: 200,
    debug: true,
    version: 1,
    whitelist: [
      'calendars'
    ],
  }, combineReducers({
    ...reducers,
    form: reduxFormReducer,
    router: routerReducer,
  }))

  const store = createStore(app, undefined, compose(
    applyMiddleware(
      _sagaMiddleware,
      _routerMiddleware,
    )
  ))

  _sagaMiddleware.run(sagas)

  const persistor = persistStore(store)

  return {
    history,
    persistor,
    store,
  }
}

// https://github.com/rt2zz/redux-persist
// https://github.com/agershun/alasql/wiki/Webworker
// http://lokijs.org/
// https://github.com/pouchdb-community/worker-pouch
// https://developer.ibm.com/clouddataservices/2016/02/26/running-pouchdb-in-a-web-worker/
