import { handleActions } from 'redux-actions'
import {
  setExternalsImportFormError,
  setExternalsImportFormSuccess
} from '../actions'

export const externalsImportForm = handleActions({
  [ setExternalsImportFormError ] (state, { payload }) {
    return {
      error: {}
    }
  },

  [ setExternalsImportFormSuccess ] (state, { payload }) {
    return {
      success: {}
    }
  }
}, {})
