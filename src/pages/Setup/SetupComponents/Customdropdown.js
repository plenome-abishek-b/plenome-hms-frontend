// CustomDropdownRenderer.jsx
import React, { useState, useEffect } from 'react';

const CustomDropdownRenderer = ({ value, api, node, colDef, handleDropdownChangeCallback }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleDropdownChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);

    if (colDef.field === 'morning' || colDef.field === 'night') {
      handleDropdownChangeCallback(node, newValue, colDef.field);
    }
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <select value={selectedValue} onChange={handleDropdownChange}>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  );
};

export default CustomDropdownRenderer;
