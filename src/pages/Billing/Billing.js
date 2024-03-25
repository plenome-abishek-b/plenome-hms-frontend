import PropTypes from "prop-types";
import React,{useState} from "react";
import { Button, Container, Input, Label } from "reactstrap";
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import { Row, Col, Card, CardBody } from "reactstrap";
import "./styles.css";
import api from "services/Api";
//redux

const Billing = props => {

  const [datas, setDatas] = useState()
  const [respData,setRespdata] = useState()

  const handleChange = event => {
    console.log(event.target, "oooo")
    const { name, value } = event.target
    console.log(name, value, "change")
    setDatas(value)
    // handleClose()
  }

  console.log(datas,'datas outside')
  const getBilling = async() => {
    console.log(datas,'datassss');
    const response = await api.getBillings(datas)
    const {data} = response
    console.log(data,'billings data')
    setRespdata(data)
  }

  console.log(respData,'datas coming');
 

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
              {/* <Col lg={4} md={6}>
                <Card>
                  <Link to='/billing/opdbilling'>
                    <CardBody className="billingelmt">
                      <div className="d-flex justify-content-center p-3">
                        <i
                          className="fas fa-stethoscope fa-lg custom-icon"
                          style={{ fontSize: "40px" }}
                        ></i>
                        
                        
                      </div>
                      <p className="fw-bold fs-4 text-center mt-2">OPD</p>
                    </CardBody>
                    
                  </Link>
                </Card>
              </Col> */}
              <Col lg={3} md={6}>
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
              {/* s */}
              {/* <Col lg={4} md={6}>
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
              </Col> */}
              {/* <Col lg={4} md={6}>
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
              </Col> */}
              {/* <Col lg={4} md={6}>
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
              </Col> */}
              <Col lg={6}>
                <Card className="p-1">
                  <CardBody>
                    <Label>Enter Case ID<span className="text-danger"> *</span></Label>
                    <br />
                    <Input name="id" value={datas} onChange={handleChange}></Input>
                    <div className="d-flex justify-content-end">
                    <button className="btn btn-primary mt-3 " onClick={getBilling}>Search</button>
                    </div>
                    
                  </CardBody>
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
