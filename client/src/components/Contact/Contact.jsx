import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContactForm from './ContactForm';
import ContactComplete from './ContactComplete';
import Spinner from '../Spinner/Spinner';

class Contact extends Component {
  renderContent() {
    if (this.props.error) {
      return <ContactComplete error={this.props.error} />;
    } else if (this.props.loading) {
      return <Spinner />;
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
  loading: state.contact.loading,
});

Contact.propTypes = {
  complete: PropTypes.bool,
  error: PropTypes.shape({}),
  loading: PropTypes.bool,
};

Contact.defaultProps = {
  complete: null,
  error: null,
  loading: null,
};

export default connect(mapStateToProps)(Contact);
