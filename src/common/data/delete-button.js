import React from 'react';

const DeleteButtonRenderer = ({ onClick }) => (
  <span onClick={onClick} style={{ cursor: 'pointer' }}>
    <i className="fas fa-trash-alt"></i> 
  </span>
);

export default DeleteButtonRenderer;
