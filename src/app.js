import './style/app.less'

import ReactDOM from 'react-dom'
import AppProvider from './components/AppProvider'

const target = document.body.appendChild(document.createElement('div'));

ReactDOM.render((
  <AppProvider />
), target);





/*
https://github.com/reactjs/react-redux/blob/master/docs/api.md#api
https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
http://redux.js.org/docs/faq/ReactRedux.html#react-multiple-components
http://redux.js.org/docs/basics/UsageWithReact.html
https://rajdee.gitbooks.io/redux-in-russian/
https://github.com/reacttraining/react-router/tree/master/packages/react-router-redux
https://reacttraining.com/react-router/web/guides/redux-integration
https://medium.com/russian/a-cartoon-intro-to-redux-e2108896f7e6

https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
https://developer.mozilla.org/en-US/docs/Web/API/URL
https://developers.google.com/web/updates/2016/01/urlsearchparams?hl=en
*/
