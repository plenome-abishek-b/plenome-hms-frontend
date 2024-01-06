import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import storage from "services/Storage"
import api from "services/Api"
import * as mqtt from 'mqtt/dist/mqtt.min'

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

const Abhagenerateotp = props => {
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

    const handleFormSubmit = async () => {
        const abhaAddress = localStorage.getItem("abhaAddress");
        console.log(abhaAddress,'abha')
        const type = "HIP";
        const typeId = "1234567";
        const otp_purpose = "KYC_AND_LINK";
        const authMode = "MOBILE_OTP"
    
        try {
    
          const response_otp = await api.initAbhaOtp({
            authMode,
            abhaAddress,
            purpose: otp_purpose,
            type,
            typeId,
          });

    
          console.log(response_otp, "resss otp");
          const {data_otp} = response_otp
          console.log(data_otp,'data abha')
          history.push('/account/abham1verifyotp')
          
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
                  <div className="d-flex justify-content-center">
                    {" "}
                    <h4>Generate Mobile OTP</h4>
                  </div>
                  <div className="d-flex justify-content-center mt-5 mb-5">
                    <button
                      className="btn-mod"
                      onClick={handleFormSubmit}
                    >
                      Mobile OTP
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

export default withRouter(Abhagenerateotp)
