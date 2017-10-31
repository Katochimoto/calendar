import { createAction } from 'redux-actions'
import uuid from '../utils/uuid'

export const createExternalCalendar = createAction(
  'CREATE_EXTERNAL',
  data => ({
    ...data,
    id: uuid(),
    active: true,
    status: 0, // удален, изменен, новый
    updated: 0,
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
