import {
  put,
  takeEvery,
} from 'redux-saga/effects'

import {
  createExternalCalendar as createExternalCalendarAction,
  importICS as importICSAction,
} from '../actions'

function* importICSAsync ({ payload: {
  color,
  name,
  source,
} }) {

  yield put(createExternalCalendarAction({
    color,
    name,
    source,
  }))
}

export default function* importICS () {
  yield takeEvery(importICSAction, importICSAsync)
}
