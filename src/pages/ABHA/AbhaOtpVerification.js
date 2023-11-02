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

import { withRouter, Link, useHistory, useParams } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"
import aadhar from "./images/shield.png"
import * as mqtt from 'mqtt/dist/mqtt.min'
console.log(aadhar)

const Abhaverifyotp = props => {
  const history = useHistory()

useEffect(() => {
  
  const client = mqtt.connect('mqtt://3.108.145.57:7890', {
    clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
    username: 'plenome',
    password: 'cloud@PT2023',
  });

  client.on('error', (error) => {
    console.error('MQTT connection error:', error);
  });

  client.on('connect', () => {
    console.log('Connected to Cloud');
    client.subscribe('abdm/response');
  });

  client.on('message', (topic, message) => {
    if (topic === 'abdm/response') {
      console.log(message.toString(),'subscribed message')
    }
  });

  return () => {
    client.end();
  };
}, []);

  const [formData, setFormData] = useState()

  const onChange = e => {
    console.log(e.target.value, "lllll")
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }


  const handleFormSubmit = async () => {
    const abhaAddress = formData.abhaAddress;
    localStorage.setItem('abhaAddress',abhaAddress)
    console.log(abhaAddress, "abha");
    const purpose = "LINK";
    const type = "HIP";
    const typeId = "1234567";
    const otp_purpose = "KYC_AND_LINK";
    const authMode = "MOBILE_OTP"

    try {
      const response = await api.linkAbhabyOtp({
        abhaAddress,
        purpose,
        type,
        typeId,
      });

      console.log(response, "ressssssssss");
      const { data } = response;
      console.log(data, "dattt");

      history.push('/account/abhagenerateotp')

    } catch (error) {
      console.error("Error:", error);
    }
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
                        <div className="p-4">
                          <h4 className="text-white">Enter ABHA Address</h4>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-3">
                    <label>Enter ABHA Address</label>
                    <br />
                    <input
                      id="abhaAddress"
                      onChange={e => onChange(e)}
                      value={formData?.abhaAddress || ""}
                      style={{
                        width: "100%",
                        height: "30px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                    ></input>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={handleFormSubmit}
                    >
                      submit
                    </button>
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

export default withRouter(Abhaverifyotp)
