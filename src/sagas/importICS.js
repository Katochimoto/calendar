import {
  put,
  takeEvery,
} from 'redux-saga/effects'

import {
  createExternalCalendar as createExternalCalendarAction,
  setExternalsImportFormSuccess as setExternalsImportFormSuccessAction,
  setExternalsImportFormError as setExternalsImportFormErrorAction,
  importICS as importICSAction,
} from '../actions'

import store from '../store'

function* importICSAsync ({ payload: {
  color,
  name,
  source,
} }) {
  const { calendars } = store.getState();

  if (calendars.some(item => item.source === source)) {
    yield put(setExternalsImportFormErrorAction({
      fields: {
        source: 'duplicate'
      }
    }))

  } else {
    yield put(createExternalCalendarAction({
      color,
      name,
      source,
    }))

    yield put(setExternalsImportFormSuccessAction())
  }
}

export default function* importICS () {
  yield takeEvery(importICSAction, importICSAsync)
}
