import { createStore, applyMiddleware } from 'redux';

import apiMiddleware from './middleware/api.js';
import rootReducer from './reducer';

// Centralized application state
// For more information visit http://redux.js.org/
const createStoreWithMiddleware = applyMiddleware(
  apiMiddleware
)(createStore);

const store = createStoreWithMiddleware(rootReducer, {}); 

export default store;
