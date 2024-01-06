import React, { useState } from "react"
import { Container, Row, Col, Card, Table } from "reactstrap"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import General from "./SettingPages/General"
import EmailSetting from "./SettingPages/EmailSetting"
import PaymentSetting from "./SettingPages/PaymentSetting"
import RoleSetting from "./SettingPages/Roles"
import SmsSetting from "./SettingPages/SmsSetting"
import PrefixSetting from "./SettingPages/PrefixSetting"
import UserSetting from "./SettingPages/UserSetting"
import { withTranslation } from "react-i18next"

function Settings() {
  const [activeSetting, setActiveSetting] = useState("General");

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
                    <th>
                      <h4>General settings</h4>
                    </th>
                  </tr>
                  <tr>
                    <th>
                    <Link to="#" onClick={() => handleSettingClick("General")} className='text-white'>
                        General
                      </Link>
                    </th>
                  </tr>
                  {/* <tr>
                    <th>
                      <Link>System Notification</Link>
                    </th>
                  </tr> */}
                  <tr>
                    <th>
                    <Link to="#" onClick={() => handleSettingClick("Email")} className='text-white'>
                        Email Setting
                      </Link>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <Link to="#" onClick={() => handleSettingClick("Role")} className='text-white'>Roles & Permissions</Link>
                    </th>
                  </tr>
                  <tr>
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
                  </tr>
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
                  {/* <tr>
                    <th>
                      <Link>Languages</Link>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <Link>Captcha settings</Link>
                    </th>
                  </tr> */}
                  {/* <tr>
                    <th>
                      <Link>Modules</Link>
                    </th>
                  </tr> */}
                  <tr>
                    <th>
                    <Link to="#" onClick={() => handleSettingClick("Prefix")} className='text-white'>Prefix settings</Link>
                    </th>
                  </tr>
                  <tr>
                    <th>
                     <Link to='#' className='text-white'>System Updates</Link>
                    </th>
                  </tr>
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
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default withTranslation()(Settings)
