import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import { Row, Col, Card, CardBody } from "reactstrap";
import "./styles.css";
//redux

const Billing = props => {

 

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Billing")}
            breadcrumbItem={props.t("Billing")}
          />
          <div className="billing">
            <Row>
              <Col lg={4} md={6}>
                <Card>
                  <Link to='/billing/opdbilling'>
                    <CardBody className="billingelmt">
                      <div className="d-flex justify-content-center p-3">
                        <i
                          className="fas fa-stethoscope fa-lg"
                          style={{ fontSize: "40px" }}
                        ></i>
                        
                        
                      </div>
                      <p className="fw-bold fs-4 text-center mt-2">OPD</p>
                    </CardBody>
                    
                  </Link>
                </Card>
              </Col>
              <Col lg={4} md={6}>
                <Card>
                  <Link to='/billing/appointmentbilling'>
                    <CardBody className="billingelmt">
                      <div className="d-flex justify-content-center p-3">
                        <i
                          className="fas fa-list"
                          style={{ fontSize: "40px" }}
                        ></i>
                      </div>
                      <p className="fw-bold fs-4 text-center mt-2">Appointment</p>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
              <Col lg={4} md={6}>
                <Card>
                  <Link to='/billing/bloodissuebilling'>
                    <CardBody className="billingelmt">
                      <div className="d-flex justify-content-center p-3">
                        <i
                          className="fas fa-tint fa-lg"
                          style={{ fontSize: "40px" }}
                        ></i>
                      </div>
                      <p className="fw-bold fs-4 text-center mt-2">Blood Issues</p>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
              <Col lg={4} md={6}>
                <Card>
                  <Link to='/billing/radiologybilling'>
                    <CardBody className="billingelmt">
                      <div className="d-flex justify-content-center p-3">
                        <i
                          className="fas fa-microscope fa-lg"
                          style={{ fontSize: "40px" }}
                        ></i>
                      </div>
                      <p className="fw-bold fs-4 text-center mt-2">Radiology</p>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
              <Col lg={4} md={6}>
                <Card>
                  <Link to='/billing/pathologybilling'>
                    <CardBody className="billingelmt">
                      <div className="d-flex justify-content-center p-3">
                        <i
                          className="fas fa-flask fa-lg"
                          style={{ fontSize: "40px" }}
                        ></i>
                      </div>
                      <p className="fw-bold fs-4 text-center mt-2">Pathology</p>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
              <Col lg={4} md={6}>
                <Card>
                  <Link to='/billing/bloodcomponentbilling'>
                    <CardBody className="billingelmt">
                      <div className="d-flex justify-content-center p-3">
                        <i
                          className="fas fa-burn fa-lg"
                          style={{ fontSize: "40px" }}
                        ></i>
                      </div>
                      <p className="fw-bold fs-4 text-center mt-2">Blood component Issue</p>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Billing);
