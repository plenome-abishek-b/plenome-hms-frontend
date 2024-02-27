// ModuleToggles.js
import React from 'react';

const ModuleToggles = ({ modules, onToggle }) => {
  console.log("Modules received in ModuleToggles:", modules);
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
