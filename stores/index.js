import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

import themeReducer from './themeReducer'

let composeEnhancers = compose;
if (__DEV__){
  composeEnhancers = window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}
const store = createStore(
  themeReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;