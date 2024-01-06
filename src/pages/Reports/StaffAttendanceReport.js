import PropTypes from "prop-types";
import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";

//Import Breadcrumb
//i18n
import { withTranslation } from "react-i18next";

//redux

const Staffattendancereport = props => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <h4>Staff Attendance Report</h4>
                    <Card className="p-4">
                        <CardBody>
                            <Row>
                                <Col lg="4">
                                    <label>Role</label>
                                    <br />
                                    <select style={{ width: '100%',height: "30px", border: '1px solid grey', borderRadius: '5px' }}>
                                        <option>Admin</option>
                                        <option>Super Admin</option>
                                        <option>Doctor</option>
                                        <option>Pharmacist</option>
                                        <option>Pathologist</option>
                                        <option>Radiologist</option>
                                        <option>Nurse</option>
                                        <option>Accountant</option>
                                    </select>
                                </Col>

                                <Col lg="4">
                                    <label>Month</label>
                                    <br />
                                    <select style={{  width: '100%',height: "30px", border: '1px solid grey', borderRadius: '5px' }}>
                                        <option>select</option>
                                        <option>January</option>
                                        <option>February</option>
                                        <option>March</option>
                                        <option>April</option>
                                        <option>May</option>
                                        <option>June</option>
                                        <option>July</option>
                                        <option>August</option>
                                        <option>September</option>
                                        <option>October</option>
                                        <option>November</option>
                                        <option>December</option>
                                    </select>
                                </Col>

                                <Col lg="4">
                                    <label>Year</label>
                                    <br />
                                    <select style={{  width: '100%',height: "30px", border: '1px solid grey', borderRadius: '5px' }}>
                                        <option>select</option>
                                        <option>2021</option>
                                        <option>2022</option>

                                        <option>2023</option>
                                    </select>
                                </Col>
                            </Row>
                            <br />
                            <div className="d-flex justify-content-end">
                                <button className="btn-mod">Search</button>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default withTranslation()(Staffattendancereport);
