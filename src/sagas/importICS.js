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

  // проверить совпадение source

  // ошибка при совпадении
  // yield put(setExternalsImportFormError())

  yield put(createExternalCalendarAction({
    color,
    name,
    source,
  }))

  // успех
  // yield put(setExternalsImportFormSuccess())
}

export default function* importICS () {
  yield takeEvery(importICSAction, importICSAsync)
}
