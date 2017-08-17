import { createStore, combineReducers } from 'redux'
import reducers from '../reducers'

const app = combineReducers(reducers)

export default createStore(app, {})
