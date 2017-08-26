import { handleActions } from 'redux-actions'
import { createSource } from '../actions'

export const sources = handleActions({
  [ createSource ] (state, { payload }) {
    return {
      ...state,
      [ payload._id ]: payload
    };
  }
}, {})
