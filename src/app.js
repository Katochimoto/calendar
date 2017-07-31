import './style/common.less';

import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import App from './components/App';

// import dav from 'dav';

// https://reacttraining.com/react-router/

ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.body.appendChild(document.createElement('div')));

// var client = new dav.Client(xhr);
// client.createAccount({
//   server: 'http://dav.example.com',
//   accountType: 'carddav'
// })
// .then(function(account) {
//   account.addressBooks.forEach(function(addressBook) {
//     console.log('Found address book name ' + addressBook.displayName);
//     // etc.
//   });
// });
