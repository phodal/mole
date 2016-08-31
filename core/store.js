import { createStore, applyMiddleware } from 'redux';

import apiMiddleware from './middleware/api.js';
import rootReducer from './reducer';

const createStoreWithMiddleware = applyMiddleware(
  apiMiddleware
)(createStore);

// Centralized application state
// For more information visit http://redux.js.org/
const store = createStoreWithMiddleware(rootReducer, {});

export default store;
