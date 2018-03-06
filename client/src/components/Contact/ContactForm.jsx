import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions';
import ContactField from './ContactField';
import formFields from './formFields';

const validate = (values) => {
  const errors = {};

  formFields.forEach(({ name, label }) => {
    if (!values[name]) {
      errors[name] = `${label} Required`;
    }
  });

  return errors;
};

class ContactForm extends Component {
  renderformFields = () => {
    const fields = formFields.map(({ label, type, name, tag }) => ( // eslint-disable-line object-curly-newline, max-len
      <Field
        key={name}
        type={type}
        name={name}
        tag={tag}
        placeholder={label}
        component={ContactField}
      />
    ));
    return <div>{fields}</div>;
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(values => this.props.submitContact(values))}>
        <p>Like what you see? Lets work together.</p>
        {this.renderformFields()}
        <button className="contact-submit" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitContact: PropTypes.func.isRequired,
};

ContactForm = connect( // eslint-disable-line no-class-assign
  null,
  actions,
)(ContactForm);

export default reduxForm({
  validate,
  form: 'ContactForm',
})(ContactForm);
