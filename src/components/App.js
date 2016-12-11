import Calendar from './Calendar';

const App = () => (
  <Calendar bindChangeEvents={bindChangeEvents}
    onChangeEvents={onChangeEvents}/>
);

export default App;

function bindChangeEvents() { // callback
  // callback();
}

function onChangeEvents() { // action, payload

}
