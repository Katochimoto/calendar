import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux'

import {
  storage,
  persistReducer,
  persistStore,
} from 'redux-persist'

import createSagaMiddleware from 'redux-saga'

import {
  reducer as formReducer
} from 'redux-form'

import * as reducers from '../reducers'
import sagas from '../sagas'

const sagaMiddleware = createSagaMiddleware()

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
  form: formReducer
}))

export default function configureStore () {
  const store = createStore(app, undefined, compose(
    applyMiddleware(sagaMiddleware)
  ))

  sagaMiddleware.run(sagas)

  const persistor = persistStore(store)

  return {
    store,
    persistor,
  }
}

// https://github.com/rt2zz/redux-persist
// https://github.com/agershun/alasql/wiki/Webworker
// http://lokijs.org/
// https://github.com/pouchdb-community/worker-pouch
// https://developer.ibm.com/clouddataservices/2016/02/26/running-pouchdb-in-a-web-worker/
