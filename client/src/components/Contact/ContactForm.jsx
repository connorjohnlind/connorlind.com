import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import validateEmails from '../../utils/validateEmails';
import ContactField from './ContactField';
import formFields from './formFields';

class ContactForm extends Component {
  renderformFields = () => {
    const fields = formFields.map(({ label, name }) => (
      <Field
        key={name}
        type="text"
        name={name}
        label={label}
        component={ContactField}
      />
    ));
    return <div>{fields}</div>;
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => this.props.submitContact(values))}>
          {this.renderformFields()}
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.email = validateEmails(values.email || '');

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = 'Provide a value';
    }
  });

  return errors;
}

ContactForm = connect(
  null,
  actions,
)(ContactForm);

export default reduxForm({
  validate,
  form: 'ContactForm',
})(ContactForm);
