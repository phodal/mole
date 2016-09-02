import { createStore, applyMiddleware } from 'redux';

import apiMiddleware from './middleware/api.js';
import rootReducer from './reducer';

const createStoreWithMiddleware = applyMiddleware(
  apiMiddleware
)(createStore);

const store = createStoreWithMiddleware(rootReducer, {});

export default store;
