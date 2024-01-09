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

console.log(aadhar)

const Abhamobileotp = props => {
  const history = useHistory()
  const [formData, setFormData] = useState()

  const onChange = e => {
    console.log(e.target.value, "lllll")
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const AbhaAddressCreation = async () => {
    const transactionId = localStorage.getItem("txnID")
    console.log(transactionId,'transsss ID')

    try {
      const response = await api.postAbhaOtp(
        transactionId,
        formData,
      )

      const txnID = response.data.transactionId

      console.log(txnID,'response')
      localStorage.setItem("txnID",txnID)
      history.push('/account/abhaphrsuggestion')
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
                  <div className="bg-primary">
                    <Row>
                      <Col xs={7}>
                        <div className="p-5">
                          <h2 className="text-white">Enter Mobile OTP</h2>
                        </div>
                      </Col>
                      <Col
                        className="col-4 align-self-end"
                        style={{
                          width: "90px",
                          height: "50px",
                          marginLeft: "140px",
                          marginBottom: "60px",
                        }}
                      >
                        <img src={aadhar} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-3 p-4 text-center">
                    <label className="fs-5">Enter OTP</label>
                    <br />
                    <div className="d-flex justify-content-center">
                      <input
                        id="value"
                        onChange={e => onChange(e)}
                        value={formData?.value || ""}
                        style={{
                          width: "40%",
                          borderRadius: "5px",
                          border: "1px solid gray",
                          height: "30px",
                        }}
                        className="mt-3"
                      />
                    </div>
                  </div>
                  <div className="mt-4 d-flex justify-content-center">
                    <button
                      className="btn-mod"
                      onClick={AbhaAddressCreation}
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

export default withRouter(Abhamobileotp)
