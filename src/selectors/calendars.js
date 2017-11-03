import {
  createSelector
} from 'reselect'

export const calendarsSelector = state => state.calendars

export const calendarSelector = createSelector(
  calendarsSelector,
  function (calendars, calendarId) {
    console.log('>>', arguments);
    return calendars[ calendarId ];
  }
)
