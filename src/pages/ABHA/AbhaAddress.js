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

const AbhaAddress = props => {
  const history = useHistory()
  const [formData, setFormData] = useState()

  const onChange = e => {
    console.log(e.target.value, "lllll")
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const AbhaAddressCreation = async () => {
    const refreshToken = localStorage.getItem("token")
    console.log(refreshToken, "reftoken")

    try {
      const response = await api.postAbhaNumber(formData, refreshToken)

      console.log(response, "responsesssss")
      const healthIdNumber = response.data.healthIdNumber
      const authMethods = response.data.authMethods[1]

      console.log(healthIdNumber, "hid no")
      console.log(authMethods, "auth methods")

      localStorage.setItem("healthIdNumber", healthIdNumber)
      localStorage.setItem("authMethods", JSON.stringify(authMethods))

      history.push("/account/abhamobileauth")

      // const { formData } = response
      // console.log(data, "abha address response")
    } catch (error) {
      console.error("Error:", error)
      // Handle errors here
    }
  }

  console.log(formData, "fdddd")

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
                  <Container className="bg-primary p-3">
                    <h4 className="text-white fw-bold">
                      ABHA Address Creation
                    </h4>
                  </Container>
                  <Row>
                    <Col className="mt-5 mb-5">
                      <label className="fs-5">
                        Enter Patient's ABHA Number
                      </label>
                      <br />
                      <input
                        id="healthIdNumber"
                        onChange={e => onChange(e)}
                        value={formData?.healthIdNumber || ""}
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          border: "1px solid grey",
                          height: "28px",
                        }}
                      ></input>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn-mod"
                      onClick={AbhaAddressCreation}
                    >
                      submit
                    </button>
                   
                  </div>
                  <div className="text-center mt-5">
                  <Link to="/account/abhaverifyotp">Already Having Abha Address?</Link>
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

export default withRouter(AbhaAddress)
