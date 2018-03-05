import { CONTACT_SUCCESS, CONTACT_FAIL } from '../actions/types';
import updateObject from '../utils/updateObject';

const initialState = {
  complete: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_SUCCESS:
      return updateObject(state, {
        complete: true,
        error: null,
      });
    case CONTACT_FAIL:
      return updateObject(state, {
        complete: true,
        error: action.payload,
      });
    default:
      return state;
  }
};

export default reducer;
