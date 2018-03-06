import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContactForm from './ContactForm';
import ContactComplete from './ContactComplete';

class Contact extends Component {
  renderContent() {
    if (this.props.error) {
      return <ContactComplete error={this.props.error} />;
    } else if (this.props.complete) {
      return <ContactComplete />;
    }
    return <ContactForm />;
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  complete: state.contact.complete,
  error: state.contact.error,
});

Contact.propTypes = {
  complete: PropTypes.bool.isRequired,
  error: PropTypes.shape({}),
};

Contact.defaultProps = {
  error: null,
};

export default connect(mapStateToProps)(Contact);
