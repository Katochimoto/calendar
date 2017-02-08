import { render } from 'react-dom';
import App from './components/App';

const root = document.body.appendChild(document.createElement('div'));

render(<App />, root);
