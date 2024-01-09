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

const Linkaddress = props => {
  const [data, setData] = useState()

  const handleFormSubmit = async () => {
    const transactionId = localStorage.getItem("txnID")
    console.log(transactionId, "transsss ID")

    try {
      const response = await api.getLinkAddress(transactionId)
      const { data } = response
      setData(data)
      console.log(data, "response here")
      localStorage.setItem("suggestions", data)
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
                    <p className="fs-4 fw-bold text-white p-4">
                      Check Availability of ABHA Addresses
                    </p>
                  </div>
                  <div className="text-center">
                    {data &&
                      data.map((item, index) => <p key={index}>{item}</p>)}
                  </div>

                  <div className="mt-4 d-flex justify-content-center">
                    <button
                      className="btn-mod"
                      onClick={handleFormSubmit}
                    >
                      Check here
                    </button>
                    <Link to='/account/abhaphrpage'>
                      <button className="btn-mod ms-3">Create</button>
                    </Link>
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

export default withRouter(Linkaddress)
