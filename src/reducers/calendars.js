import { handleActions } from 'redux-actions'
import { createExternalCalendar } from '../actions'

export const calendars = handleActions({
  [ createExternalCalendar ] (state, { payload }) {
    return {
      ...state,
      [ payload.id ]: payload
    }
  }
}, {})
