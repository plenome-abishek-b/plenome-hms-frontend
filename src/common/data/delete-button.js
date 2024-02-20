import React from 'react';

const DeleteButtonRenderer = ({ onClick }) => (
  <span onClick={onClick} style={{ cursor: 'pointer',color: '#C63D2F' }}>
    <i className="fas fa-trash-alt"></i> 
  </span>
);

export default DeleteButtonRenderer;
