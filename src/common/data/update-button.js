import React from 'react';

const EditButtonRenderer = ({ onClick }) => (
  <span onClick={onClick} style={{ cursor: 'pointer' }}>
    <i className="fas fa-pencil-alt"></i> 
  </span>
);

export default EditButtonRenderer;
