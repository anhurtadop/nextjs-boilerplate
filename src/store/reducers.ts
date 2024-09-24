import { combineReducers } from 'redux';
import counter from './counter/reducer';

const reducers = combineReducers({
  counter,
});

export default reducers;
