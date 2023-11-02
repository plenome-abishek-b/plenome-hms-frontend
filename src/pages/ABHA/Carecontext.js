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

const Carecontext = props => {
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
                  <div className="bg-primary bg-soft p-2">
                    <h5 className="fw-bold">Context Notification</h5>
                  </div>
                  <div className="mt-3 p-4">
                    <label className="fs-5">Enter Patient's Phone Number</label>
                    <br />
                    <div>
                      <input
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          border: "1px solid gray",
                          height: "30px",
                        }}
                        className="mt-3"
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 d-flex justify-content-center">
                    <button className="btn btn-primary">send</button>
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

export default withRouter(Carecontext)
