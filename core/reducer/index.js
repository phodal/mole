import { combineReducers } from 'redux';

import notes from './notes.reducer.js';

const count = (state = {}, action) => {
  switch (action) {
    case 'COUNT':
      return { ...state, count: (state.count || 0) };
    default:
      return state;
  }
};

const root = combineReducers({
  notes,
  count,
});

export default root;
