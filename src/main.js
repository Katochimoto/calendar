const { app, BrowserWindow, ipcMain } = require('electron');
//const url = require('url');
//const qs = require('querystring');
//const request = require('request');

import template from './index.pug';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = null;
let authWindow = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    resizable: true,
    frame: true,
    transparent: false
  });

  win.loadURL('data:text/html;charset=UTF-8,' + encodeURIComponent(template()));

  win.webContents.openDevTools();

  win.on('closed', () => {
    // если приложение поддерживает многооконность, то окна хранятся в массиве
    // и в этом месте окно удаляется из массива
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});



const clientId = '1076843655718008';
const redirectUri = 'https://www.facebook.com/connect/login_success.html';
const state = String(Date.now());

ipcMain.on('open-auth-window', () => {
    if (authWindow) {
        return;
    }

    authWindow = new BrowserWindow({
        //parent: win,
        //modal: true,
        fullscreenable: false,
        maximizable: false,
        minimizable: false,
        resizable: false,
        center: true,
        width: 500,
        height: 400,
        show: true,
        webPreferences: {
            //devTools: false,
            nodeIntegration: false,
            webSecurity: false
        }
    });

    const authUrl = url.format({
        protocol: 'https',
        host: 'facebook.com',
        pathname: '/dialog/oauth',
        search: qs.stringify({
            client_id: clientId,
            display: 'popup',
            redirect_uri: redirectUri,
            response_type: 'token,granted_scopes',
            scope: 'public_profile',
            state: state
        }),
        slashes: true
    });

    authWindow.loadURL(authUrl);

    authWindow.on('closed', function () {
        authWindow = null;
    });

    authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
        auth(newUrl);
    });

    authWindow.webContents.on('will-navigate', function (event, url) {
        auth(url);
    });
});

function auth(redirectUri) {
    const parse = url.parse(redirectUri, true);

    if (parse.pathname === '/connect/login_success.html') {
        let query = parse && parse.query || {};
        if (parse.hash && parse.hash.indexOf('access_token') !== -1) {
            query = qs.parse(parse.hash.replace(/^#/, ''));
        }

        console.log('>>>>>>>>>>>', query);

        if (query.state === state) {
            if (query.error) {
                console.log('ERROR', query);
                authWindow.close();

            } else if (query.access_token) {
                /*
                { state: '1474210380353',
                  access_token: 'EAAPTYjOTGY73FSDisKFQLMIbdJ0fk1g9lHTjNqxDRjYxGRz4YBDitZAuPVAZDZD',
                  expires_in: '5180031',
                  granted_scopes: 'email,contact_email,public_profile',
                  denied_scopes: '' }
                 */

                const debugUrl = url.format({
                    protocol: 'https',
                    host: 'graph.facebook.com',
                    pathname: '/v2.7/debug_token',
                    search: qs.stringify({
                        access_token: query.access_token,
                        input_token: query.access_token,
                        format: 'json'
                    }),
                    slashes: true
                });

                request.get({ url: debugUrl, json: true }, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        /*
                        { data:
                           { app_id: '1076843655718008',
                             application: 'Тестовое приложение',
                             expires_at: 1479390428,
                             is_valid: true,
                             issued_at: 1474206428,
                             scopes: [ 'email', 'public_profile' ],
                             user_id: '1246734358704920' } }
                         */

                        // TODO сохранить токен  информацию о пользователе в таблицу сессий

                    } else {
                        console.log('ERROR', query);
                    }

                    authWindow.close();
                });
            }
        }
    }
}
