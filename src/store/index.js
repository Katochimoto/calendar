import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as reducers from '../reducers'
import sagas from '../sagas'

const sagaMiddleware = createSagaMiddleware()
const app = combineReducers(reducers)

const store = createStore(app, {}, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(sagas);

export default store;
