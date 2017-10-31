import _preact from 'preact'
import _preact_compat from 'preact-compat'
import * as _react_redux from 'react-redux'
import * as _redux from 'redux'
import * as _redux_actions from 'redux-actions'
import * as _redux_saga from 'redux-saga'
import * as _redux_form from 'redux-form'
import _classnames from 'classnames'
import _raf from 'raf'
import _setimmediate2 from 'setimmediate2'
import _prop_types from 'prop-types'
import * as _react_router_dom from 'react-router-dom'
import * as _reselect from 'reselect'

import _redux_persist from 'redux-persist'
import storage from 'redux-persist/es/storage'

import 'es6-symbol/implement'

import './vendor.less'

_raf.polyfill()
_setimmediate2.polifill()

export default {
  _classnames,
  _preact_compat,
  _preact,
  _prop_types,
  _react_redux,
  _react_router_dom,
  _redux_actions,
  _redux_form,
  _redux_persist: {
    persistReducer: _redux_persist.persistReducer,
    persistStore: _redux_persist.persistStore,
    storage,
  },
  _redux_saga,
  _redux,
  _reselect,
}
