// ModuleToggles.js
import React from 'react';

const ModuleToggles = ({ modules, onToggle }) => {
  return (
    <div>
      {modules.map((module) => (
        <div key={module.id}>
          <label>
            {module.name}
            <input
              type="checkbox"
              checked={module.enabled}
              onChange={() => onToggle(module.id)}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default ModuleToggles;
