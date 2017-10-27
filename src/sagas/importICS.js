import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'

import {
  createExternalCalendar as createExternalCalendarAction,
  setExternalsImportFormSuccess as setExternalsImportFormSuccessAction,
  setExternalsImportFormError as setExternalsImportFormErrorAction,
  importICS as importICSAction,
} from '../actions'

const getCalendars = state => state.calendars

function* importICSAsync ({ payload: {
  color,
  name,
  source,
} }) {
  const calendars = yield select(getCalendars)

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
