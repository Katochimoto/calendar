import { handleActions } from 'redux-actions'
import { createCalendar } from '../actions'

export const calendars = handleActions({
  [ createCalendar ] (state, { payload }) {
    return {
      ...state,
      [ payload._id ]: payload
    };
  }
}, {})
