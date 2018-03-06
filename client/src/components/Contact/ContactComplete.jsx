import React from 'react';
import PropTypes from 'prop-types';

const ContactComplete = (props) => {
  if (props.error) {
    return (
      <div style={{ marginTop: '50px' }}>
        <h3>Unfortunately there has been an error.</h3>
        <h3>{props.error}</h3>
        <i className="fas fa-file-excel fa-5x" style={{ marginTop: '50px' }} />
      </div>
    );
  }
  return (
    <div style={{ marginTop: '50px' }}>
      <h3>Thank you so much for your submission.</h3>
      <h3>I will reach out to you by email as soon as possible.</h3>
      <i className="fas fa-check-circle fa-5x" style={{ marginTop: '50px' }} />
    </div>
  );
};

ContactComplete.propTypes = {
  error: PropTypes.shape({}),
};

ContactComplete.defaultProps = {
  error: null,
};

export default ContactComplete;
