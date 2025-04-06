import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <p style={{ color: 'red' }}>{message}</p>
    </div>
  );
};

export default ErrorMessage;