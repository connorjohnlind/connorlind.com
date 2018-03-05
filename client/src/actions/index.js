import axios from 'axios';
import { CONTACT_SUCESS, CONTACT_FAIL } from './types';

/* eslint-disable import/prefer-default-export */
export const submitContact = values => async (dispatch) => {
  try {
    await axios.post('/api/contact', values);
    dispatch({ type: CONTACT_SUCESS });
  } catch (error) {
    dispatch({ type: CONTACT_FAIL, payload: error });
  }
};
