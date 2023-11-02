import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import storage from "services/Storage"
import api from "services/Api"
import { saveAs } from "file-saver"

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
import { getDocument } from "pdfjs-dist"
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf"
import { PDFDocument, rgb } from "pdf-lib"
import jsPDF from "jspdf"
GlobalWorkerOptions.workerSrc =
  window.location.origin + "/pdfjs/pdf.worker.min.js"

function base64ToImageUrl(base64String) {
  return `data:image/png;base64,${base64String}`
}

const Aadhar = props => {
  const [formValues, setFormValues] = useState({
    name: "",
    healthIdNumber: "",
    gender: "",
    mobile: "",
    townName: "",
    districtName: "",
    stateName: "",
    pincode: "",
    address: "",
  })

  const [resData, setResdata] = useState("")

  const [showProfile, setShowProfile] = useState(false)

  const [name, setName] = useState("")
  const [healthIdNumber, setHealthIdNumber] = useState("")
  const [gender, setGender] = useState("")
  const [mobile, setMobile] = useState("")
  const [townName, setTownName] = useState("")
  const [districtName, setDistrictName] = useState("")
  const [stateName, setStateName] = useState("")
  const [pincode, setPincode] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [districtCode, setDistrictcode] = useState("")

  const history = useHistory()

  const day = resData.dayOfBirth
  const month = resData.monthOfBirth
  const year = resData.yearOfBirth

  const dateOfBirth = new Date(year, month - 1, day)
  const formattedDateOfBirth = dateOfBirth.toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })

  const profileImageBase64 = resData.profilePhoto
  const imageUrl = base64ToImageUrl(profileImageBase64)

  const handleFormSubmit = () => {
    const responseData = JSON.parse(localStorage.getItem("responseData"))

    history.push(`/account/downloadabha/${responseData}`)
  }

  const getProfile = async () => {
    const refreshToken = localStorage.getItem("token")
    console.log(refreshToken, "token")
    const response = await api.getAbhaProfile({ refreshToken })
    const { data } = response
    console.log(data, "data")
    setResdata(data)
    setShowProfile(true)

    // Set the initial values for the editable fields
    setName(data.name)
    setHealthIdNumber(data.healthIdNumber)
    setGender(data.gender)
    setMobile(data.mobile)
    setTownName(data.townName)
    setStateName(data.stateName)
    setDistrictName(data.districtName)
    setPincode(data.pincode)
    setAddress(data.address)
    setEmail(data.email)
    setDistrictcode(data.districtCode)
    // ... (set other fields)
  }

  const handleNameChange = e => {
    const newName = e.target.value
    setFormValues(prevValues => ({ ...prevValues, name: newName }))
  }

  const handleHealthIdNumberChange = e => {
    setHealthIdNumber(e.target.value)
  }

  const handleGenderChange = e => {
    setGender(e.target.value)
  }

  const handleMobileChange = e => {
    setMobile(e.target.value)
  }

  const handleTownChange = e => {
    setTownName(e.target.value)
  }
  const handleDistrictChange = e => {
    setDistrictName(e.target.value)
  }
  const handleStateChange = e => {
    setStateName(e.target.value)
  }

  const handlePincode = e => {
    const newPincode = e.target.value
    console.log(newPincode, "newpin")

    // Update the formValues state
    setFormValues(prevValues => ({ ...prevValues, pincode: newPincode }))

    // Update the pincode state
    setPincode(newPincode)
  }

  console.log(formValues, "formmmmm")

  const handleAddress = e => {
    setAddress(e.target.value)
  }

  const handleEmail = e => {
    const newEmail = e.target.value
    console.log(newEmail, "newpin")

    // Update the formValues state
    setFormValues(prevValues => ({ ...prevValues, email: newEmail }))

    // Update the pincode state
    setEmail(newEmail)
  }

  const handleDistrictCode = e => {
    const newDistrictcode = e.target.value
    console.log(newDistrictcode, "newpin")

    // Update the formValues state
    setFormValues(prevValues => ({
      ...prevValues,
      districtCode: newDistrictcode,
    }))

    // Update the pincode state
    setDistrictcode(newDistrictcode)
  }

  const updateProfile = async () => {
    const refreshToken = localStorage.getItem("token")
    console.log(refreshToken, "reftoken")
    // const datas = {
    // refreshToken: refreshToken,
    // formValues: formValues,
    // }
    const response = await api.postAbhaProfile(refreshToken, formValues)
    const { data } = response
    console.log(data, "update abha response")
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
          <Row
            className="justify-content-center"
            style={{ marginTop: "150px" }}
          >
            <Col lg="8" md="12" sm="12">
              <Card>
                <CardBody style={{ border: "10px solid rgba(0,0,0,0.3)" }}>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary"
                      onClick={handleFormSubmit}
                    >
                      Download ABHA
                    </button>
                    <button
                      className="btn btn-primary ms-3"
                      onClick={getProfile}
                    >
                      Get profile
                    </button>
                    <Link to='/account/abhaaddress'>
                      <button className="btn btn-primary ms-3">
                        ABHA Address Creation
                      </button>
                    </Link>
                  </div>
                  {showProfile && (
                    <div className="profile">
                      <div className="d-flex justify-content-end  ">
                        <img
                          src={imageUrl}
                          style={{ width: "120px", height: "120px" }}
                          alt="profile"
                        />
                      </div>
                      <p>
                        Name :{" "}
                        <span
                          contentEditable="false"
                          onInput={handleNameChange}
                        >
                          {name}
                        </span>
                      </p>
                      <p>
                        Health ID Number :{" "}
                        <span
                          contentEditable="false"
                          onInput={handleHealthIdNumberChange}
                        >
                          {healthIdNumber}
                        </span>
                      </p>
                      <p>
                        Gender :{" "}
                        <span
                          contentEditable="false"
                          onInput={handleGenderChange}
                        >
                          {gender}
                        </span>
                      </p>
                      <p>
                        mobile :{" "}
                        <span
                          contentEditable="false"
                          onInput={handleMobileChange}
                        >
                          {mobile}
                        </span>
                      </p>
                      <p>
                        Town Name :{" "}
                        <span contentEditable="true" onInput={handleTownChange}>
                          {townName}
                        </span>
                      </p>
                      <br />
                      <label>District Code :</label>&nbsp;
                      <input
                        type="text"
                        value={districtCode}
                        onChange={handleDistrictCode}
                      ></input>
                      <p>
                        District Name :{" "}
                        <span
                          contentEditable="true"
                          onInput={handleDistrictChange}
                        >
                          {districtName}
                        </span>
                      </p>
                      <p>
                        State Name :{" "}
                        <span
                          contentEditable="true"
                          onInput={handleStateChange}
                        >
                          {stateName}
                        </span>
                      </p>
                      <label>pincode :</label>&nbsp;
                      <input
                        type="text"
                        value={pincode}
                        onChange={handlePincode}
                      ></input>
                      <br />
                      <label>Email :</label>&nbsp;&nbsp;&nbsp;
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmail}
                      ></input>
                      <p>
                        Address :{" "}
                        <span contentEditable="true" onInput={handleAddress}>
                          {address}
                        </span>
                      </p>
                      <div className="d-flex justify-content-center">
                        <button
                          onClick={updateProfile}
                          className="btn btn-primary"
                        >
                          update
                        </button>
                      </div>
                    </div>
                  )}
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
