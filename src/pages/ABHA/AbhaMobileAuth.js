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

const Abhamobileauth = props => {

  const history = useHistory()

  const handleFormSubmit = async () => {
    const healhtIdNumber = localStorage.getItem("healthIdNumber")
    let authMethods = localStorage.getItem("authMethods")
    const token = localStorage.getItem("token")
  
    // Parse authMethods if it's a JSON string
    try {
      authMethods = JSON.parse(authMethods)
    } catch (error) {
      // If it's not valid JSON, keep it as a string
    }
  
    console.log(healhtIdNumber, "hiddddd")
    console.log(authMethods, "authh")
  
    try {
      const response = await api.postAbhaMobileAuth({
        authMethod: authMethods,
        healhtIdNumber: healhtIdNumber,
      })
      console.log(response,'ressssssssss')
      const {data} = response
      console.log(data,'dattt')
      
      // // Set the transaction ID in local storage
      // localStorage.setItem("transactionId", newtxnId);
      localStorage.setItem('txnID', data.transactionId);
      history.push("/account/abhamobileotp")
      
      // const { formData } = response
      // console.log(data, "abha address response")
    } catch (error) {
      console.error("Error:", error)
      // Handle errors here
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
                      className="btn btn-primary"
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

export default withRouter(Abhamobileauth)
