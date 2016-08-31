import { combineReducers } from 'redux';

// const root = combineReducers({
// });
const root = (state = {}, action) => {
  switch(action) {
    case 'COUNT': 
      return { ...state, count: (state.count || 0) }
    default: 
      return state;
  }
}

export default root;
