import { createAction } from 'redux-actions'
import uuid from '../utils/uuid'

export const createExternalCalendar = createAction('CREATE_EXTERNAL', data => ({
  ...data,
  external: true,
  _id: uuid(),
}))
