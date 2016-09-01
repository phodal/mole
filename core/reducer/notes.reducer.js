import Immutable from 'immutable';

import { ActionType } from '../action/notes.action.js';

let defaultState = Immutable.fromJS([]);

export default function(state = defaultState, action) {
  let res = action.response;

  switch(action.type) {
    case ActionType.LOADED_NOTES: 
      console.log('notes loaded!');
      localStorage.setItem("base_url", res.source);
      localStorage.setItem("content", JSON.stringify(res.content));
      return Immutable.fromJS(res.content);
    default: 
      return state;
  }
}
