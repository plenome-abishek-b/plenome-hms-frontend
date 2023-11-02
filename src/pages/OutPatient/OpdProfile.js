import PropTypes from "prop-types";
import React, { useState } from "react";
import {
    Card,
    CardBody,
    Container,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col,
    TabContent,
} from "reactstrap";

//Import Breadcrumb
//i18n
import { withTranslation } from "react-i18next";
import classnames from "classnames";
//redux
import OpdTimeline from "./OpdTable/OpdTimeline";
import { CellPositionUtils } from "ag-grid-community";
import VisitTable from "./OpdTable/VisitTable";
import Visits from "./OpdTable/Visits";
import LabInvest from "./OpdTable/LabInvestigation";
import Treatment from "./OpdTable/Treatment";
import OpdVisits from "./OpdTabs/OpdVisits";

const Message = props => {
    const [activeTab, setactiveTab] = useState("1");
    const toggle = tab => {
        if (activeTab !== tab) {
            setactiveTab(tab);
        }
    };
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col>
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
                                                    toggle("1");
                                                }}
                                            >
                                                <i
                                                    className="fas fa-th"
                                                    style={{ marginRight: "4px" }}
                                                ></i>
                                                Overview
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: activeTab === "2",
                                                })}
                                                onClick={() => {
                                                    toggle("2");
                                                }}
                                            >
                                                <i
                                                    className="fas fa-caret-square-down"
                                                    style={{ marginRight: "4px" }}
                                                ></i>
                                                Visits
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: activeTab === "3",
                                                })}
                                                onClick={() => {
                                                    toggle("3");
                                                }}
                                            >
                                                <i
                                                    className="fas fa-diagnoses"
                                                    style={{ marginRight: "4px" }}
                                                ></i>
                                                Lab Investigation
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: activeTab === "4",
                                                })}
                                                onClick={() => {
                                                    toggle("4");
                                                }}
                                            >
                                                <i
                                                    className="fas fa-hourglass-half"
                                                    style={{ marginRight: "4px" }}
                                                ></i>
                                                Treatment History
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: activeTab === "5",
                                                })}
                                                onClick={() => {
                                                    toggle("5");
                                                }}
                                            >
                                                <i
                                                    className="fas fa-calendar-check"
                                                    style={{ marginRight: "4px" }}
                                                ></i>
                                                Timeline
                                            </NavLink>
                                        </NavItem>
                                    </Nav>

                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            <Row>
                                                <Col className="lg='6">
                                                    <Row>
                                                        <Col lg="3">
                                                            <h5 className="mt-4">Patient Name</h5>
                                                            <div className="avatar-md profile-user-wid mt-3">
                                                                <img
                                                                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                                                    alt=""
                                                                    className="img-thumbnail rounded-circle"
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col lg="3" sm="6" className="mt-5 ms-3">
                                                            <p className="fw-bold">Gender</p>
                                                            <p className="fw-bold">Age</p>
                                                            <p className="fw-bold">Guardian Name</p>
                                                            <p className="fw-bold">Phone</p>
                                                        </Col>
                                                        <hr
                                                            className="mt-2"
                                                            style={{
                                                                background: "rgba(0,0,0,0.2)",
                                                                color: "grey",
                                                                borderColor: "grey",
                                                                height: "0.5px",
                                                            }}
                                                        />
                                                    </Row>
                                                    <Row>
                                                        <Col lg="3">
                                                            <p className="fw-bold">Case ID</p>
                                                            <p className="fw-bold">IPD No</p>
                                                            <p className="fw-bold">Admission Date</p>
                                                            <p className="fw-bold">Bed</p>
                                                        </Col>
                                                        <hr
                                                            className="mt-2"
                                                            style={{
                                                                background: "rgba(0,0,0,0.2)",
                                                                color: "grey",
                                                                borderColor: "grey",
                                                                height: "0.5px",
                                                            }}
                                                        />
                                                    </Row>
                                                    <Row>
                                                        <p className="fw-bold fs-5">
                                                            <i
                                                                className="fas fa-tag"
                                                                style={{ marginRight: "5px" }}
                                                            ></i>
                                                            Known Allergies
                                                        </p>
                                                        <hr
                                                            className="mt-2"
                                                            style={{
                                                                background: "rgba(0,0,0,0.2)",
                                                                color: "grey",
                                                                borderColor: "grey",
                                                                height: "0.5px",
                                                            }}
                                                        />
                                                        <p className="fw-bold fs-5">
                                                            <i
                                                                className="fas fa-tag"
                                                                style={{ marginRight: "5px" }}
                                                            ></i>
                                                            Findings
                                                        </p>
                                                        <hr
                                                            className="mt-2"
                                                            style={{
                                                                background: "rgba(0,0,0,0.2)",
                                                                color: "grey",
                                                                height: "0.5px",
                                                            }}
                                                        />
                                                        <p className="fw-bold fs-5">
                                                            <i
                                                                className="fas fa-tag"
                                                                style={{ marginRight: "5px" }}
                                                            ></i>
                                                            Symptoms
                                                        </p>
                                                        <hr
                                                            className="mt-2"
                                                            style={{
                                                                background: "rgba(0,0,0,0.2)",
                                                                color: "grey",
                                                                borderColor: "grey",
                                                                height: "0.5px",
                                                            }}
                                                        />
                                                    </Row>
                                                    <Row>
                                                        <p className="fw-bold fs-5">Consultant Doctor</p>
                                                        <div className="mt-2 ms-2 fw-bold">
                                                            <ul>
                                                                <li>
                                                                    <p>Doctor_1 name</p>
                                                                </li>
                                                                <li>
                                                                    <p>Doctor_2 name</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <hr
                                                            className="mt-2"
                                                            style={{
                                                                background: "rgba(0,0,0,0.2)",
                                                                color: "grey",
                                                                borderColor: "grey",
                                                                height: "0.5px",
                                                            }}
                                                        />
                                                    </Row>
                                                    <Row>
                                                        <Col className="" style={{ borderRadius: "8px" }}>
                                                            <p className="fw-bold fs-5 mt-4">Timeline</p>
                                                            <OpdTimeline />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="6">
                                                    <hr
                                                        className="mt-2"
                                                        style={{
                                                            background: "rgba(0,0,0,0.2)",
                                                            color: "grey",
                                                            borderColor: "grey",
                                                            height: "0.5px",
                                                        }}
                                                    />
                                                    <Row>
                                                        <Col>
                                                            <p className="fw-bold fs-5">Visit Details</p>
                                                            <Visits />
                                                            <br />
                                                            <p className="fw-bold fs-5">Lab Investigation</p>
                                                            <LabInvest />
                                                            <br />
                                                            <hr
                                                                className="mt-2"
                                                                style={{
                                                                    background: "rgba(0,0,0,0.2)",
                                                                    color: "grey",
                                                                    borderColor: "grey",
                                                                    height: "0.5px",
                                                                }}
                                                            />
                                                            <p className="fw-bold fs-5">Treatment History</p>
                                                            <Treatment />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2">
                                        <h4 className="mt-4">Visits</h4>
                                            <Visits />
                                        </TabPane>
                                        <TabPane tabId="3">
                                        <h4 className="mt-4">Lab Investigation</h4>
                                            <LabInvest />
                                        </TabPane>
                                        <TabPane tabId="4">
                                        <h4 className="mt-4">Treatment History</h4>
                                            <Treatment />
                                        </TabPane>
                                        <TabPane tabId="5">
                                        <h4 className="mt-4">Timeline</h4>
                                            <OpdTimeline />
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default withTranslation()(Message);
