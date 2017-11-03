import {
  createSelector
} from 'reselect'

export const calendarsSelector = state => state.calendars

export const calendarSelector = createSelector(
  [
    calendarsSelector,
    (state, calendarId) => calendarId
  ],
  function (calendars, calendarId) {
    return calendars[ calendarId ];
  }
)
