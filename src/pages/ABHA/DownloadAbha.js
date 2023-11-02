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

const Downloadabha = props => {
  const responseData = JSON.parse(localStorage.getItem("responseData"))
  console.log(responseData, "ress")

  const handleFormSubmit = () => {
    const token = localStorage.getItem("token")
    console.log(token, "token1")

    api
      .downloadAbhaCard({ token })
      .then(async resp => {
        const pngData = resp.data
        console.log(pngData)

        const img = new Image()

        img.src = `data:image/png;base64,${pngData}`

        const link = document.createElement("a")

        link.href = `data:image/png;base64,${pngData}`

        link.download = "image.png"

        document.body.appendChild(link)

        link.click()

        document.body.removeChild(link)
      })
      .catch(error => {
        console.error("Error fetching data:", error)
      })
  }

  const handleQrcode = () => {
    const token = localStorage.getItem("token")
    console.log(token, "token1")

    api
      .downloadQR({ token })
      .then(resp => {
        const jpgData = resp.data
        console.log(jpgData)

        const img = new Image()

        img.src = `data:image/jpg;base64,${jpgData}`

        const link = document.createElement("a")

        link.href = `data:image/jpg;base64,${jpgData}`

        link.download = "image.jpg"

        document.body.appendChild(link)

        link.click()

        document.body.removeChild(link)
      })
      .catch(error => {
        console.error("Error fetching data:", error)
      })
  }

  const handlePng = () => {
    const token = localStorage.getItem("token")

    api
      .donwloadPng({ token })
      .then(resp => {
        const pngData = resp.data
        console.log(pngData)

        const img = new Image()

        img.src = `data:image/png;base64,${pngData}`

        const link = document.createElement("a")

        link.href = `data:image/png;base64,${pngData}`

        link.download = "image.png"

        document.body.appendChild(link)

        link.click()

        document.body.removeChild(link)
      })
      .catch(error => {
        console.error("Error fetching data:", error)
      })
  }

  const handleSvg = () => {
    const token = localStorage.getItem("token")

    api
      .downloadSvg({ token })
      .then(resp => {
        const svgData = resp.data
        console.log(svgData)

        const img = new Image()

        img.src = `data:svg;base64,${svgData}`

        const link = document.createElement("a")

        link.href = `data:image/svg;base64,${svgData}`

        link.download = "abha.svg"

        document.body.appendChild(link)

        link.click()

        document.body.removeChild(link)
      })
      .catch(error => {
        console.error("Error fetching data:", error)
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
                  <div className="bg-primary bg-soft fs-4 text-primary fw-bold p-4">
                    Download ABHA
                  </div>
                  <div
                    className="mt-5 d-flex justify-content-center"
                    style={{ display: "flex" }}
                  >
                    <button
                      className="btn btn-primary ms-3"
                      onClick={handleFormSubmit}
                    >
                      Card
                    </button>
                    <button
                      className="btn btn-primary ms-3"
                      onClick={handleQrcode}
                    >
                      QR Code
                    </button>
                    <button
                      className="btn btn-primary ms-3"
                      onClick={handleSvg}
                    >
                      SVG
                    </button>
                    <button
                      className="btn btn-primary ms-3"
                      onClick={handlePng}
                    >
                      PNG
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

export default withRouter(Downloadabha)
