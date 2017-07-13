import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import App from './components/App';

const app = document.getElementById('app');

// https://reacttraining.com/react-router/

ReactDOM.render((
  <Router>
    <App />
  </Router>
), app);
