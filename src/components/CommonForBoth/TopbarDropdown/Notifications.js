import PropTypes from "prop-types"
import React from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import alert from "./warning.png"
import { BiSolidMessageAltError, BiMessageAltCheck } from "react-icons/bi"
//i18n
import { withTranslation } from "react-i18next"

//redux

const Notifications = props => {
  console.log(alert)
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Notifications</h4>
          <div className="mt-3">
            <Card style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
              <Row className="d-flex justify-content-center mt-3">
                <Col lg="11">
                  <Card>
                    <CardBody>
                      <div>
                        <div
                          className="d-flex justify-content-end"
                          style={{
                            position: "absolute",
                            top: "25px",
                            left: "85%",
                          }}
                        >
                          <BiSolidMessageAltError className="fs-1 text-danger" />
                          <h5 className="text-danger fw-bold mt-1 ms-2">
                            Very Urgent
                          </h5>
                        </div>

                        <p className="fs-5">
                          Patient Raja (44) has elevated BP needs to be
                          monitored
                        </p>
                        <div className="bg-secondary p-2" style={{width: '280px', borderRadius: '6px', height: '40px'}}>
                          <p className="fs-5 fw-bold text-white">Age : 32&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ward : 108&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BP : 106</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center">
                <Col lg="11">
                  <Card>
                    <CardBody>
                      <div>
                        <div
                          className="d-flex justify-content-end"
                          style={{
                            position: "absolute",
                            top: "25px",
                            left: "85%",
                          }}
                        >
                          <BiMessageAltCheck className="fs-1 text-success" />
                          <h5 className="text-success fw-bold ms-2 mt-1">Normal</h5>
                        </div>
                        <p className="fs-5">
                          Patient Venkat (41) booked for checkup
                        </p>
                        <div className="bg-secondary p-2" style={{width: '500px', borderRadius: '6px', height: '40px'}}>
                          <p className="fs-5 fw-bold text-white">Age : 22&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ward : 97&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Temperature : 99&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reason : Fever</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center">
                <Col lg="11">
                  <Card>
                    <CardBody>
                      <div>
                        <div
                          className="d-flex justify-content-end"
                          style={{
                            position: "absolute",
                            top: "25px",
                            left: "85%",
                          }}
                        >
                          <BiSolidMessageAltError className="fs-1 text-warning" />
                          <h5 className="text-warning fw-bold ms-2 mt-1">Urgent</h5>
                        </div>

                        <p className="fs-5">
                          Patient Oviya (42) has elevated Pulse and temperature
                        </p>
                        <div className="bg-secondary p-2" style={{width: '450px', borderRadius: '6px', height: '40px'}}>
                          <p className="fs-5 fw-bold text-white">Age : 23&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ward : 101&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Temperature : 106&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pulse : 120</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center">
                <Col lg="11">
                  <Card>
                    <CardBody>
                      <div>
                        <div
                          className="d-flex justify-content-end"
                          style={{
                            position: "absolute",
                            top: "25px",
                            left: "85%",
                          }}
                        >
                          <BiSolidMessageAltError className="fs-1 text-danger" />
                          <h5 className="text-danger fw-bold ms-2 mt-1">Very Urgent</h5>
                        </div>

                        <p className="fs-5">
                          Patient akash (47) has elevated respiration rate and temperature
                        </p>
                        <div className="bg-secondary p-2" style={{width: '350px', borderRadius: '6px', height: '40px'}}>
                          <p className="fs-5 fw-bold text-white">Age : 22&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ward : 103&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Temperature : 102</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Card>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Notifications)
