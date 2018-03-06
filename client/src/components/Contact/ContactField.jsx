import React from 'react';

export default (props) => {
  const Tag = `${props.tag}`;

  let placeholderText;
  let placeholderStyle;

  if (props.meta.touched && props.meta.error) {
    placeholderText = props.meta.touched && props.meta.error;
    placeholderStyle = 'validation-error';
  } else {
    placeholderText = props.placeholder;
  }

  return (
    <div>
      <Tag
        placeholder={placeholderText}
        className={placeholderStyle}
        type={props.type}
        {...props.input}
      />
    </div>
  );
};
