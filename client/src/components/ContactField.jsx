import React from 'react';

export default ({ input, label, meta: { error, touched } }) => (
  <div>
    <label>{label}</label>
    <input {...input} style={{ marginBottom: '5px' }} />
    <div style={{ marginBottom: '20px' }}>
      {touched && error}
    </div>
  </div>
);
