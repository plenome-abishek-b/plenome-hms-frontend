import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  CardTitle,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  CardText,
} from "reactstrap"

import { Link, withRouter } from "react-router-dom"

import classnames from "classnames"

const SmsSetting = () => {
  const initialSmsSettingValue = {
    
  }

  const [activeTab, setactiveTab] = useState("1")
  const [formData, setFormData] = useState(initialSmsSettingValue);
  const userTabs = [
    { name: "Clickatell Gateway", tabId: "1" },
    { name: "Twilio SMS Gateway", tabId: "2" },
    { name: "Text Local", tabId: "3" },
    { name: "SMS Country", tabId: "4" },
  ]

  const toggle = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }

  const onChange = (e) => {
    console.log(e.target.value,"lllll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  
  function handleFormSubmit() {
    api.postGeneralSetting(formData).then(resp => {
      console.log(resp,'general response')
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <h4>Payment Methods</h4>

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggle("1")
                        }}
                      >
                        Clickatell Gateway
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "2",
                        })}
                        onClick={() => {
                          toggle("2")
                        }}
                      >
                        Twilio SMS Gateway
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "3",
                        })}
                        onClick={() => {
                          toggle("3")
                        }}
                      >
                        Text Local
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "4",
                        })}
                        onClick={() => {
                          toggle("4")
                        }}
                      >
                        SMS Country
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <div className="table-responsive">
                        <Container>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Clickatell Username</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Clickatell Password</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Clickatell API Key</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <label>Status</label>
                              <br />
                              <select style={{ width: "100%" }}>
                                <option>select</option>
                                <option>Disabled</option>
                                <option>Enabled</option>
                              </select>
                            </Col>
                          </Row>
                          <br />
                          <div className="d-flex justify-content-center">
                            <button className="btn-mod">Save</button>
                          </div>
                        </Container>
                      </div>
                    </TabPane>
                    <TabPane tabId="2">
                      <div className="table-responsive">
                        <Container>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Twilio account SID</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Authentication Token</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Registered Mobile Number</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Status</label>
                              <br />
                              <select style={{ width: "100%" }}>
                                <option>select</option>
                                <option>Disabled</option>
                                <option>Enabled</option>
                              </select>
                            </Col>
                          </Row>
                          <br />
                          <div className="d-flex justify-content-center">
                            <button className="btn-mod">Save</button>
                          </div>
                        </Container>
                      </div>
                    </TabPane>
                    <TabPane tabId="3">
                      <div className="table-responsive">
                        <Container>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Username</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Hash Key</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Sender ID</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Status</label>
                              <br />
                              <select style={{ width: "100%" }}>
                                <option>select</option>
                                <option>Disabled</option>
                                <option>Enabled</option>
                              </select>
                            </Col>
                          </Row>
                          <br />
                          <div className="d-flex justify-content-center">
                            <button className="btn-mod">Save</button>
                          </div>
                        </Container>
                      </div>
                    </TabPane>
                    <TabPane tabId="4">
                      <div className="table-responsive">
                        <Container>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Username</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Sender ID</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Password</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Status</label>
                              <br />
                              <select style={{ width: "100%" }}>
                                <option>select</option>
                                <option>Disabled</option>
                                <option>Enabled</option>
                              </select>
                            </Col>
                          </Row>
                          <br />
                          <div className="d-flex justify-content-center">
                            <button className="btn-mod">Save</button>
                          </div>
                        </Container>
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(SmsSetting)
