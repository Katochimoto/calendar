import { combineReducers } from 'redux';
import { Map } from 'immutable';

export default combineReducers({
    test: test
});

function test(state = new Map()) {
    return state;
}
