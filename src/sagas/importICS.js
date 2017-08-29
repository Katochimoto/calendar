import {
  put,
  takeEvery,
} from 'redux-saga/effects'

import {
  createExternal as createExternalAction,
  importICS as importICSAction,
} from '../actions'

function* importICSAsync ({ payload: {
  color,
  name,
  source,
} }) {

  yield put(createExternalAction({
    color,
    name,
    source,
  }))
}

export default function* importICS () {
  yield takeEvery(importICSAction, importICSAsync)
}
