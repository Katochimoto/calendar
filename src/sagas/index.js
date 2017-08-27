import { all, put, take, takeEvery } from 'redux-saga/effects'

import {
  createCalendar,
  createSource,
  importICS,
} from '../actions'

function* importICSSagaAsync ({ payload: { name, color, url } }) {
  const { payload: { _id } } = yield put(createSource({ url }))

  yield put(createCalendar({
    name,
    color,
    _sourceId: _id
  }))
}

function* importICSSaga () {
  yield takeEvery(importICS, importICSSagaAsync)
}

export default function* main () {
  yield all([
    importICSSaga()
  ])
}
