import { createAction } from 'redux-actions'

export const importICS = createAction(
  'IMPORT_ICS',
  ({
    color,
    name,
    source,
  }) => ({
    color,
    name,
    source,
  })
)
