import React from 'react';
import injectSheet from 'react-jss';
import styles from '../SignUpForm/styles';

const renderField = ({
  input,
  width,
  type,
  label,
  meta: { touched, error },
  classes,
  placeholder
}) => {
  return (
    <div>
      <input
        className={classes.text}
        {...input}
        type={type}
        placeholder={placeholder}
        margin="normal"
      />
      <div style={{ color: 'red' }}>
        {touched && (error && <span>{error}</span>)}
      </div>
    </div>
  );
};

export default injectSheet(styles)(renderField);
