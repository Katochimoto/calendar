import { handleActions } from 'redux-actions'
import { importICS } from '../actions'

export const calendars = handleActions({
  [ importICS ] (state, { payload }) {
    return [
      ...state,
      {
        color: payload.color,
        name: payload.name,
        url: payload.url,
      }
    ];
  }
}, []);
