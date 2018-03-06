import axios from 'axios';
import { CONTACT_SUCCESS, CONTACT_FAIL } from './types';

/* eslint-disable import/prefer-default-export */
export const submitContact = values => async (dispatch) => {
  try {
    await axios.post('/api/contact', values);
    dispatch({ type: CONTACT_SUCCESS });
  } catch (error) {
    dispatch({ type: CONTACT_FAIL, payload: error.response });
  }
};
