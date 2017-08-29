import { createAction } from 'redux-actions'

export const importICS = createAction('IMPORT_ICS', formData => ({
  color: formData.get('color'),
  name: formData.get('name'),
  source: formData.get('source'),
}))
