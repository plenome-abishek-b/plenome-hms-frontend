import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import storage from "services/Storage"
import api from "services/Api"

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter, Link, useHistory } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"
import aadhar from "./images/shield.png"

console.log(aadhar)

const Aadhar = props => {
  const [formData, setFormData] = useState();
  const [txnId, setTxnId] = useState(null); 

  const history = useHistory();

  const onChange = (e) => {
    console.log(e.target.value, "lllll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  


  function handleFormSubmit() {
    api.generateAbhaOtp(formData).then(resp => {
      console.log(resp)
      const {data} = resp;
      console.log(`Transaction ID: ${data.txnId}`);
      setTxnId(data.txnId);
      history.push(`/account/verifyotp/${data.txnId}`);
    })
  }

  return (
    <React.Fragment>
      {/* <Sidebar props={userData}/> */}
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5 bg-primary bg-soft">
        <Container style={{ height: "600px" }}>
          <Row
            className="justify-content-center"
            style={{ marginTop: "150px" }}
          >
            <Col lg="8" md="12" sm="12">
              <Card>
                <CardBody>
                  <div className="bg-primary">
                    <Row>
                      <Col xs={7}>
                        <div className="p-5">
                          <h2 className="text-white">Aadhar Verification</h2>
                        </div>
                      </Col>
                      <Col className="col-4 align-self-end" style={{ width: '90px', height: '50px', marginLeft: '140px', marginBottom: '60px' }}>
                        <img
                          src={aadhar}
                          alt=""
                          className="img-fluid"
                        />
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-3 p-4">
                    <label className="fs-5">
                      Enter Patient's Aadhar Number
                    </label>
                    <br />
                    <div><input
                      style={{ width: "100%", borderRadius: '5px', border: '1px solid gray', height: '30px' }}
                      className="mt-3"
                      id="aadhaar"
                      onChange={e => onChange(e)}
                      value={formData?.aadhaar || ""}
                    />
                    </div>

                  </div>
                  <div className="mt-4 d-flex justify-content-center">
                    
                      <button className="btn btn-primary" onClick={handleFormSubmit}>submit</button>
                    
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Aadhar)
