import axios from 'axios';
import { CONTACT_LOADING, CONTACT_SUCCESS, CONTACT_FAIL } from './types';

export const postContact = values => async (dispatch) => {
  try {
    await axios.post('/api/contact', values);
    dispatch({ type: CONTACT_SUCCESS });
  } catch (error) {
    dispatch({ type: CONTACT_FAIL, payload: error.response });
  }
};

export const submitForm = values => (dispatch) => {
  dispatch({ type: CONTACT_LOADING });
  dispatch(postContact(values));
};
