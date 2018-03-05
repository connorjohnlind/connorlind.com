import { CONTACT_SUCCESS, CONTACT_FAIL } from '../actions/types';
import updateObject from '../utils/updateObject';

const initialState = {
  success: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_SUCCESS:
      return updateObject(state, {
        success: true,
      });
    case CONTACT_FAIL:
      return updateObject(state, {
        success: false,
      });
    default:
      return state;
  }
};

export default reducer;
