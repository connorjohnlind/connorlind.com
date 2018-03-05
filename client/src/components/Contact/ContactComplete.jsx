import React from 'react';

export default (props) => {
  if (props.error) {
    return (
      <div>
        Error!
      </div>
    );
  }
  return (
    <div>
      Thanks!!!!
    </div>
  );
};
