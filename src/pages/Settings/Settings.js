import React, { useState } from "react";
import { Container, Row, Col, Card, Table } from "reactstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import General from "./SettingPages/General";
import EmailSetting from "./SettingPages/EmailSetting";
import PaymentSetting from "./SettingPages/PaymentSetting";
import RoleSetting from "./SettingPages/Roles";
import SmsSetting from "./SettingPages/SmsSetting";
import PrefixSetting from "./SettingPages/PrefixSetting";
import UserSetting from "./SettingPages/UserSetting";
import { withTranslation } from "react-i18next";

import Modules from "./SettingPages/Modules";
import ModuleSettingsPage from "./SettingPages/ModuleToggleSettings";
import ModuleToggleSettings from "./SettingPages/ModuleToggleSettings";
import LanguageSettings from "./SettingPages/LanguageSettings";

function Settings() {
  const [activeSetting, setActiveSetting] = useState("Modules");

  const handleSettingClick = (settingName) => {
    setActiveSetting(settingName);
  };

  return (
    <Container fluid>
      <Row className="mt-5">
        <Col lg="2" md="6" sm="4" className="ms-3 mt-3">
          <Card className="mt-3">
            <div className="table-responsive">
              <Table className="table mb-0">
                <thead>
                  <tr>
                    <th className="fw-bold text-center">
                      <h4>General settings</h4>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-start fs-5 fw-bold">
                    <Link to="#" onClick={() => handleSettingClick("General")} className='text-white'>
                    <i className="fas fa-wrench"></i>&nbsp;&nbsp; General
                      </Link>
                    </th>
                  </tr>
                  {/* <tr>
                    <th>
                      <Link>System Notification</Link>
                    </th>
                  </tr> */}
                  {/* <tr>
                    <th>
                    <Link to="#" onClick={() => handleSettingClick("Email")} className='text-white'>
                        Email Setting
                      </Link>
                    </th>
                  </tr> */}
                  <tr>
                    <th>
                      <Link to="#" onClick={() => handleSettingClick("Role")} className='text-white fs-5 fw-bold'><i class="fas fa-user"></i>&nbsp;&nbsp; Roles & Permissions</Link>
                    </th>
                  </tr>
                  {/* <tr>
                    <th>
                      <Link to="#" onClick={() => handleSettingClick("Payments")} className='text-white'>Payments</Link>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <Link to="#" onClick={() => handleSettingClick("Users")} className='text-white'>Users</Link>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <Link to="#" onClick={() => handleSettingClick("Sms")} className='text-white'>SMS settings</Link>
                    </th>
                  </tr>  */}
                  {/* <tr>
                    <th>
                      <Link>Backup / Restore</Link>
                    </th>
                  </tr> */}
                  {/* <tr>
                    <th>
                      <h4>Other settings</h4>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <Link>Front CMS Settings</Link>
                    </th>
                  </tr> */}
                  <tr>
                    <th className="text-start fs-5 fw-bold">
                      <Link className="text-white" onClick={() => handleSettingClick("Languages")}><i className="fas fa-language"></i>&nbsp;&nbsp;  Languages</Link>
                    </th>
                  </tr>
                  {/* <tr>
                    <th>
                      <Link>Captcha settings</Link>
                    </th>
                  </tr> */}
                  <tr>
                    <th className="text-start fs-5 fw-bold">
                      <Link
                        to="#"
                        onClick={() => handleSettingClick("Modules")}
                        className="text-white"
                      >
                        <i className="fas fa-list"></i>&nbsp;&nbsp; Modules
                      </Link>
                    </th>
                  </tr>
                  <tr>
                    <th>
                    <Link to="#" onClick={() => handleSettingClick("Prefix")} className='text-white fs-5 fw-bold'><i className="fas fa-file-word"></i>&nbsp;&nbsp; Prefix settings</Link>
                    </th>
                  </tr>
                  {/* <tr>
                    <th>
                     <Link to='#' className='text-white'>System Updates</Link>
                    </th>
                  </tr> */}
                </thead>
              </Table>
            </div>
          </Card>
        </Col>
        <Col lg="9" md="8" sm="12">
          <Card>
            {activeSetting === "General" && <General />}
            {activeSetting === "Email" && <EmailSetting />}
            {activeSetting === "Payments" && <PaymentSetting />}
            {activeSetting === "Role" && <RoleSetting />}
            {activeSetting === "Sms" && <SmsSetting />}
            {activeSetting === "Prefix" && <PrefixSetting />}
            {activeSetting === "Users" && <UserSetting />}
            {activeSetting === "Modules" && <Modules />}
            {activeSetting === "Languages" && <LanguageSettings />}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default withTranslation()(Settings);
