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
import api from "services/Api"

const PaymentSetting = () => {
  const initialPaymentValue = {
    payment_type: '',
    api_username: '',
    api_secret_key: '',
    salt: '',
    api_publishable_key: '',
    paytm_website: '',
    api_password: '',
    api_signature: '',
    paypal_demo: '',
    account_no: '',
    created_at: '2023-09-08 11:11:11'
  }

  const [activeTab, setactiveTab] = useState("1")
  const [formData, setFormData] = useState(initialPaymentValue);
  const userTabs = [
    { name: "Paypal", tabId: "1" },
    { name: "Razorpay", tabId: "2" },
    { name: "Paytm", tabId: "3" },
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
    api.postPaymentSetting(formData).then(resp => {
      console.log(resp,'payment response')
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <h4>Payment Methods</h4>

          <Row>
            <Col lg="8">
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
                        Paypal
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
                        Razorpay
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
                        Paytm
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
                              <label>Paypal Username</label>
                              <br />
                              <input style={{ width: "100%" }} id="api_username" onChange={e=>onChange(e)}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Paypal Password</label>
                              <br />
                              <input style={{ width: "100%" }} id="api_password"></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Paypal Signature</label>
                              <br />
                              <input style={{ width: "100%" }} id='api_signature'></input>
                            </Col>
                          </Row>
                          <br />
                          <div className="d-flex justify-content-center">
                            <button className="btn btn-primary" onClick={handleFormSubmit}>Save</button>
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
                              <label>Razorpay Key ID</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Razorpay Key Secret</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <div className="d-flex justify-content-center">
                            <button className="btn btn-primary">Save</button>
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
                              <label>Merchant ID</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Merchant Key</label>
                              <br />
                              <input style={{ width: "100%" }}></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Website</label>
                              <br />
                              <input style={{ width: "100%" }} id="paytm_website"></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="12">
                              <label>Industry Type</label>
                              <br />
                              <input style={{ width: "100%" }} id="paytm_industrytype"></input>
                            </Col>
                          </Row>
                          <br />
                          <div className="d-flex justify-content-center">
                            <button className="btn btn-primary">Save</button>
                          </div>
                        </Container>
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <label>Select Payment Gateway</label>
              <Row>
                <div>
                  <input type="radio"></input>
                  <p>Paypal</p>
                </div>
              </Row>
              <Row>
                <div>
                  <input type="radio"></input>
                  <p>Paytm</p>
                </div>
              </Row>
              <Row>
                <div>
                  <input type="radio"></input>
                  <p>Razorpay</p>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(PaymentSetting)
