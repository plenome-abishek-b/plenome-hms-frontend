import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import api from "services/Api";
import { useParams,useHistory } from "react-router-dom";
import { Row, Col, CardBody, Card, Container, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import key from "./images/key.png";
import * as mqtt from 'mqtt/dist/mqtt.min'

const Verifyabhaotp = () => {
  const [authcode,setAuthcode] = useState('')

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
        const data = message.toString()
        const new_data = JSON.parse(data)
        const mqtt_id = new_data.auth.transactionId
        console.log(mqtt_id,'id')
        const mqtt_data = localStorage.setItem('mqtt_id',mqtt_id)
      }
    });
  
    return () => {
      client.end();
    };
  }, []);

  const handleFormSubmit = async () => {
    const txnId = localStorage.getItem("mqtt_id")
    

    try {

      const response_otp = await api.verifyM1AbhaOtp({
        txnId,
        authcode
      });


      console.log(response_otp, "resss otp");
      
    } catch (error) {
      console.error("Error:", error);
    }
}

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5 bg-primary bg-soft">
        <Container style={{ height: "600px" }}>
          <Row className="justify-content-center" style={{ marginTop: "150px" }}>
            <Col lg="8" md="12" sm="12">
              <Card>
                <CardBody>
                  <div className="bg-primary">
                    <Row>
                      <Col xs={7}>
                        <div className="p-5">
                          <h2 className="text-white">OTP Verification</h2>
                        </div>
                      </Col>
                      <Col className="col-4 align-self-end" style={{ width: "90px", height: "50px", marginLeft: "140px", marginBottom: "60px" }}>
                        <img src={key} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-3 p-4 text-center">
                    <label className="fs-4">Enter OTP</label>
                    <br />
                    <input
                      type="text"
                      value={authcode}
                      id="authcode"
                      onChange={(e) => setAuthcode(e.target.value)}
                      style={{
                        width: "30%",
                        borderRadius: "5px",
                        border: "1px solid gray",
                        height: "40px",
                        textAlign: "center",
                      }}
                      maxLength={6}
                    />
                  </div>
                  <div className="mt-4 d-flex justify-content-center">
                    
                      <button className="btn-mod" onClick={handleFormSubmit}>
                        Verify
                      </button>
                   
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Verifyabhaotp;
