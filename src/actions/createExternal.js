import { createAction } from 'redux-actions'
import uuid from '../utils/uuid'

export const createExternal = createAction('CREATE_EXTERNAL', data => ({
  ...data,
  _id: uuid()
}))
