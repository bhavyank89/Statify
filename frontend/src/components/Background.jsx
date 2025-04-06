import React from 'react';
import './Background.css';

const Background = ({ children }) => {
  return <div className="background-boxes">{children}</div>;
};

export default Background;