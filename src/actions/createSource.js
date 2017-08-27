import { createAction } from 'redux-actions'

export const createSource = createAction('CREATE_SOURCE', data => ({
  ...data,
  dateCreate: Date.now(),
  _id: 123
}))
