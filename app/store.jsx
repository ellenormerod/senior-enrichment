import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';

import campuses from './reducers/Campuses';
import index from './reducers/index.jsx';
import students from './reducers/Students';
import NewCampus from './reducers/NewCampus';
import NewStudent from './reducers/NewStudent';
  
  
const reducer = combineReducers({
    campuses,
    index,
    students,
    NewCampus,
    NewStudent
  })

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger())))
