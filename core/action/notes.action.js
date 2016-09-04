import keymirror from 'keymirror';
import { CALL_API } from '../middleware/api.js';

const ActionType = keymirror({
  LOADED_NOTES: null,
});

export { ActionType };

export function loadNotes() {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/all.json',
      successType: ActionType.LOADED_NOTES,
    },
  };
}
