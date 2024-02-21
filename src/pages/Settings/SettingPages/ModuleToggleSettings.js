// SettingsPage.js
import React, { useState, useEffect } from "react";
import ModuleToggles from "./ModuleSetting";
import { Card, Row } from "reactstrap";

const ModuleSettingsPage = () => {
  const [modules, setModules] = useState([
    { id: "dashboard", name: "Dashboard", enabled: true },
    { id: "billing", name: "Billing", enabled: true },
  ]);

  const handleToggle = (moduleId) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? { ...module, enabled: !module.enabled }
          : module
      )
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Row>
          <h2>Module Settings</h2>
          <br />
          <ModuleToggles modules={modules} onToggle={handleToggle} />
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ModuleSettingsPage;
