import { createAction } from 'redux-actions'
import uuid from '../utils/uuid'

export const createExternalCalendar = createAction(
  'CREATE_EXTERNAL',
  data => ({
    ...data,
    _id: uuid(),
  })
)

export const setExternalsImportFormError = createAction(
  'SET_EXTERNAL_IMPORT_FORM_ERROR',
  error => error
)

export const setExternalsImportFormSuccess = createAction(
  'SET_EXTERNAL_IMPORT_FORM_SUCCESS',
  success => success
)

export const resetExternalsImportForm = createAction(
  'SET_EXTERNAL_IMPORT_FORM_RESET',
  () => {}
)
