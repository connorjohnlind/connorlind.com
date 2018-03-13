import { CONTACT_LOADING, CONTACT_SUCCESS, CONTACT_FAIL } from '../actions/types';
import updateObject from '../utils/updateObject';

const initialState = {
  complete: null,
  error: null,
  loading: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_LOADING:
      return updateObject(state, {
        loading: true,
      });
    case CONTACT_SUCCESS:
      return updateObject(state, {
        complete: true,
        error: null,
        loading: false,
      });
    case CONTACT_FAIL:
      return updateObject(state, {
        complete: true,
        error: action.payload,
        loading: false,
      });
    default:
      return state;
  }
};

export default reducer;
