import { handleActions } from 'redux-actions'
import { createExternal } from '../actions'

export const externals = handleActions({
  [ createExternal ] (state, { payload }) {
    return {
      ...state,
      [ payload._id ]: payload
    };
  }
}, {})
