import { all } from 'redux-saga/effects'

import importICS from './importICS'

export default function* main () {
  yield all([
    importICS()
  ])
}
