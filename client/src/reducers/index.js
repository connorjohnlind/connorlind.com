import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import contactReducer from './contactReducer';

export default combineReducers({
  contact: contactReducer,
  form: reduxForm,
});
