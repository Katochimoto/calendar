import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux'

import {
  autoRehydrate,
} from 'redux-persist'

import createSagaMiddleware from 'redux-saga'

import {
  reducer as formReducer
} from 'redux-form'

import * as reducers from '../reducers'
import sagas from '../sagas'

const sagaMiddleware = createSagaMiddleware()

const app = combineReducers({
  ...reducers,
  form: formReducer
})

const store = createStore(app, undefined, compose(
  applyMiddleware(sagaMiddleware),
  autoRehydrate({
    log: true
  })
))

sagaMiddleware.run(sagas)

export default store

// https://github.com/rt2zz/redux-persist
// https://github.com/agershun/alasql/wiki/Webworker
// http://lokijs.org/
// https://github.com/pouchdb-community/worker-pouch
// https://developer.ibm.com/clouddataservices/2016/02/26/running-pouchdb-in-a-web-worker/
