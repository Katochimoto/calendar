import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

const root = document.body.appendChild(document.createElement('div'));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);

// import { ipcRenderer } from 'electron';

// require('devtron').install();

// console.log('We are using node', process.versions.node);
// console.log('Chrome', process.versions.chrome);
// console.log('and Electron', process.versions.electron);

// https://developers.facebook.com/apps/1076843655718008/dashboard/
// https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow

// API Graph
// https://developers.facebook.com/docs/graph-api

// Graph API Explorer
// https://developers.facebook.com/tools/explorer/1076843655718008?method=GET&path=me%3Ffields%3Did%2Cname&version=v2.7
// https://developers.facebook.com/tools/debug/accesstoken
// https://developers.facebook.com/docs/graph-api/reference/v2.7/debug_token

// https://github.com/electron/electron/blob/master/docs/api/web-contents.md
// https://github.com/electron/electron/blob/master/docs/api/browser-window.md
// https://github.com/electron/electron/blob/master/docs/api/ipc-main.md

// https://github.com/nageshpodilapu/Using-Facebook-Twitter-API-with-Electron-Application/blob/master/index.js
// http://manos.im/blog/electron-oauth-with-github/

// document.getElementById('auth').addEventListener('click', function () {
//     ipcRenderer.send('open-auth-window');
// });
