import { handleActions } from 'redux-actions'
import {
  resetExternalsImportForm,
  setExternalsImportFormError,
  setExternalsImportFormSuccess,
} from '../actions'

export const externalsImportForm = handleActions({
  [ setExternalsImportFormError ] (state, { payload }) {
    return {
      error: payload
    }
  },

  [ setExternalsImportFormSuccess ] (state, { payload }) {
    return {
      success: {}
    }
  },

  [ resetExternalsImportForm ] () {
    return {}
  }
}, {})
