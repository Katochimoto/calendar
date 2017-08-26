import { createAction } from 'redux-actions'

export const createCalendar = createAction('CREATE_CALENDAR', data => ({
  ...data,
  dateCreate: Date.now(),
  _id: 321
}))
