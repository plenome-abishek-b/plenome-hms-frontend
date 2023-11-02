import React, { useState, useEffect } from "react";
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
} from "reactstrap";

import { Link, withRouter } from "react-router-dom";

import classnames from "classnames";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const UserProfile = () => {
  const [activeTab, setactiveTab] = useState("1");
  const userTabs = [
    { name: "Profile", tabId: "1" },
    { name: "Address", tabId: "2" },
    { name: "Health", tabId: "3" },
  ];

  const toggle = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="User Profile" breadcrumbItem="Profile" />

          <Row>
            <Col xl="4">
              <Card className="overflow-hidden">
                <div className="bg-dark bg-soft">
                  <Row>
                    <Col xs="7">
                      <div className="text-white p-3 mb-3 mt-2">
                        <h4 className="text-dark">User Profile</h4>
                      </div>
                    </Col>
                    <Col xs="5" className="align-self-end">
                      <img src="" alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <Row>
                    <Col sm="4">
                      <div className="avatar-md profile-user-wid mb-4">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                          alt=""
                          className="img-thumbnail rounded-circle"
                        />
                      </div>
                      <h5 className="font-size-15 text-truncate">Name</h5>
                      <p className="text-muted mb-0 text-truncate font-size-12">
                        UI/UX Designer
                      </p>
                    </Col>
                  </Row>
                </CardBody>
                <Card>
                  <CardBody>
                    <div className="table-responsive">
                      <Table className="table-nowrap mb-0">
                        <tbody>
                          <tr>
                            <th scope="row">Staff ID :</th>
                            <td></td>
                          </tr>
                          <tr>
                            <th scope="row">Full Name :</th>
                            <td></td>
                          </tr>
                          <tr>
                            <th scope="row">Role :</th>
                            <td></td>
                          </tr>
                          <tr>
                            <th scope="row">Department :</th>
                            <td></td>
                          </tr>
                          <tr>
                            <th scope="row">Designation :</th>
                            <td></td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Card>
            </Col>

            <Col xl="8">
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
                        Profile
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
                        Address
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <div className="table-responsive">
                        <Table className="table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">Father Name :</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th scope="row">Mother Name :</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th scope="row">Gender :</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th scope="row">E-mail :</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th scope="row">Date of birth :</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th scope="row">Blood Group :</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th scope="row">PAN Number :</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th scope="row">Work Experience :</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th scope="row">Qualification :</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th scope="row">Work type :</th>
                              <td></td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </TabPane>
                    <TabPane tabId="2">
                      <div className="table-responsive">
                        <Table className="table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">Current Address :</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th scope="row">Permanent Address :</th>
                              <td></td>
                            </tr>
                          </tbody>
                        </Table>
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

export default withRouter(UserProfile);
