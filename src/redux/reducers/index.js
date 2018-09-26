import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import bookcases from './bookcasesReducer';

const store = combineReducers({
  user,
  login,
  bookcases
});

export default store;
