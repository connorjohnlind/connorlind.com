import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactForm from './ContactForm';

class Contact extends Component {
  renderContent() {
    console.log(this);
    // if error, show error
    // else if complete, show thank you
    // else show form
  }
  render() {
    return (
      <div>
        Contact Redux Form!
        <ContactForm />
        {this.renderContent()}
      </div>
    );
  }
}

export default connect(null)(Contact);
