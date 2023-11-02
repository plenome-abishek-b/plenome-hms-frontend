import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { TextField } from "@mui/material"
import { Input, Select } from "@material-ui/core"
import { Row, Col, Container } from "reactstrap"
import { useEffect } from "react"
import api from "services/Api"
import { useState } from "react"
// import { Formik } from "formik"
import { useFormik } from "formik"

export default function IpdPatientDialog({
  open,
  handleClose,
  setFetchData,
}) {
  const [bloodgroupData, setBloodgroupData] = useState("")
  useEffect(() => {
    handleBloodgroup()
    handleBloodgroups()
  }, [])

  const handleBloodgroup = async () => {
    const response = await api.getBloodgroups()
    const { data } = response
    setBloodgroupData(data)
    console.log(data, "data")
  }

  const [formValues, setFormValues] = useState({
    patient_name: "",
    guardian_name: "",
    day: "",
    image: "",
    gender: "Male",
    dob: "",
    age: "",
    is_ipd: "",
    is_opd: "",
    patient_type: "",
    app_key: "",
    is_dead: "no",
    is_active: "yes",
    created_at: "2023-02-02 11:11:11",
    blood_group: "",
    marital_status: "single",
    mobileno: "",
    month: "",
    email: "",
    address: "",
    note: "",
    known_allergies: "",
    insurence_id: "",
    insurence_validity: "",
    identification_number: "",
  })
  const [bloodgroupDatas, setBloodgroupDatas] = useState([])

  useEffect(() => {
    handleBloodgroup()
  }, [])

  const handleBloodgroups = async () => {
    const response = await api.getBloodgroups()
    const { data } = response
    
    setBloodgroupData(data)
    console.log(data, "data")
  }

  const handleChange = event => {
    // event.preventDefault()
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async event => {
    // event.preventDefault()
    console.log("form values: ", formValues)
    setFetchData(formValues)
    const response = await api.postPatient(formValues)
    
  }

  return (
    <div>
      <form>
        {/* <form onSubmit={formik.handleSubmit}> */}

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xl"
        >
          <DialogTitle
            id="alert-dialog-title"
            className="text-primary bg-primary bg-soft"
          >
            Add Patient
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            ></div>
          </DialogTitle>
          <DialogContent className="mt-4 ms-2">
            <Container className="p-2">
              <Row>
                <Col lg="6" md="6" sm="12">
                  <label>Name</label>
                  <br />
                  <input
                    type="text"
                    name="patient_name"
                    placeholder=""
                    style={{ width: "100%", height: "35px" }}
                    value={formValues.patient_name}
                    onChange={handleChange}
                    //   onChange={formik.handleChange}
                    // value={formik.values.name}
                  ></input>
                </Col>
                <Col lg="6" md="6" sm="12">
                  <label>Guardian Name</label>
                  <br />
                  <input
                    type="text"
                    name="guardian_name"
                    value={formValues.guardian_name}
                    onChange={handleChange}
                    //   onChange={formik.handleChange}
                    // value={formik.values.guardian_name}
                    placeholder=""
                    style={{ width: "100%", height: "35px" }}
                  ></input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm="2">
                  <label>Gender</label>
                  <br />
                  <select
                    style={{ width: "100%", height: "35px" }}
                    name="gender"
                    value={formValues.gender}
                    onChange={handleChange}
                    // onChange={formik.handleChange}
                    // value={formik.values.gender}
                  >
                    <option value="Male">Male</option>
                    <option valuu="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                </Col>
                <Col sm="2">
                  <label>Age</label>
                  <br />
                  <input
                    name="age"
                    value={formValues.age}
                    onChange={handleChange}
                    style={{
                      width: "35px",
                      height: "35px",
                      marginRight: "5px",
                    }}
                    placeholder="YY"
                  ></input>
                  <input
                    name="month"
                    value={formValues.month}
                    onChange={handleChange}
                    style={{
                      width: "35px",
                      height: "35px",
                      marginRight: "5px",
                    }}
                    placeholder="MM"
                  ></input>
                  <input
                    name="day"
                    value={formValues.day}
                    onChange={handleChange}
                    style={{ width: "35px", height: "35px" }}
                    placeholder="DD"
                  ></input>
                  <br />
                </Col>

                <Col sm="2">
                  <label>Date of Birth</label>
                  <br />
                  <input
                    type="date"
                    name="dob"
                    value={formValues.dob}
                    onChange={handleChange}
                    //   onChange={formik.handleChange}
                    // value={formik.values.dob}
                    style={{ width: "100%", height: "35px" }}
                  ></input>
                </Col>
                <Col sm="2">
                  <label>Blood Group</label>
                  <br />
                  <select
                    style={{ width: "100%", height: "35px" }}
                    name="blood_group"
                    value={formValues.blood_group}
                    onChange={handleChange}
                    //  onChange={formik.handleChange}
                    //  value={formik.values.bloodgroup}
                  >
                    <option>Select an field</option>
                    {bloodgroupData &&
                      bloodgroupData.map(bloodgroup => (
                        <option key={bloodgroup.name} value={bloodgroup.name}>
                          {bloodgroup.name}
                        </option>
                      ))}
                  </select>
                </Col>
                <Col sm="2">
                  <label>Marital Status</label>
                  <select
                    style={{ width: "100%", height: "35px" }}
                    name="marital_status"
                    value={formValues.marital_status}
                    onChange={handleChange}
                    //  onChange={formik.handleChange}
                    //  value={formik.values.gender}
                  >
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="seperated">Separated</option>
                    <option value="not_specified">Not Specified</option>
                  </select>
                </Col>
                <Col sm="2">
                  <label style={{ width: "100%" }}>Patient Photo</label>
                  <input type="file" name="image" placeholder=""></input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="4" md="4" sm="3">
                  <label>Phone</label>
                  <br />
                  <input
                    type="number"
                    name="mobileno"
                    value={formValues.mobileno}
                    onChange={handleChange} // onChange={formik.handleChange}
                    // value={formik.values.number}
                    placeholder=""
                    style={{ width: "100%", height: "35px" }}
                  ></input>
                </Col>
                <Col lg="4" md="4" sm="3">
                  <label>Email</label>
                  <br />
                  <input
                    type="text"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    // onChange={formik.handleChange}
                    // value={formik.values.email}
                    placeholder=""
                    style={{ width: "100%", height: "35px" }}
                  ></input>
                </Col>
                <Col lg="4" md="4" sm="2">
                  <label>Address</label>
                  <br />
                  <input
                    type="text"
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                    // onChange={formik.handleChange}
                    // value={formik.values.address}
                    placeholder=""
                    style={{ width: "100%", height: "35px" }}
                  ></input>
                </Col>
              </Row>
              <br />
              <Row>
                {/* <Col lg="6" md="6" sm="3">
              <label>Remarks</label>
              <input name="remarks"
        onChange={formik.handleChange}
        value={formik.values.remarks} maxLength="2" style={{ width: "100%" }}></input>
            </Col> */}
                <Col lg="4" md="4" sm="3">
                  <label>Remarks</label>
                  <br />
                  <input
                    type="text"
                    name="note"
                    value={formValues.note}
                    onChange={handleChange}
                    // onChange={formik.handleChange}
                    // value={formik.values.remarks}
                    placeholder=""
                    style={{ width: "100%", height: "35px" }}
                  ></input>
                </Col>
                <Col lg="4" md="4" sm="3">
                  <label>Any know Alargies</label>
                  <br />
                  <input
                    type="text"
                    name="known_allergies"
                    value={formValues.known_allergies}
                    onChange={handleChange}
                    // onChange={formik.handleChange}
                    // value={formik.values.alargies}
                    placeholder=""
                    style={{ width: "100%", height: "35px" }}
                  ></input>
                </Col>
                {/* <Col sm="2"> */}
                {/* <label>MONTH</label>
              <br />
              <input name="month"
              value={formValues.month}
              onChange={handleChange}></input> */}
                {/* </Col> */}

                {/* <Col sm="2">
              <label>DAY</label>
              <br />
              <input name="day"
              value={formValues.day}
              onChange={handleChange}></input>
            </Col> */}
              </Row>
              {/* <br /> */}

              {/* <br /> */}

              <Row>
                <Col lg="4" md="4" sm="3">
                  <label>TPA ID</label>
                  <br />
                  <input
                    type="text/number"
                    name="insurence_id"
                    value={formValues.insurence_id}
                    onChange={handleChange}
                    // onChange={formik.handleChange}
                    // value={formik.values.tpaId}
                    placeholder=""
                    style={{ width: "100%", height: "35px" }}
                  ></input>
                </Col>
                <Col lg="4" md="4" sm="3">
                  <label>TPA Validity</label>
                  <br />
                  <input
                    name="insurence_validity"
                    value={formValues.insurence_validity}
                    onChange={handleChange}
                    // onChange={formik.handleChange}
                    // value={formik.values.tpa_validity}
                    type="text/number"
                    placeholder=""
                    style={{ width: "100%", height: "35px" }}
                  ></input>
                </Col>

                <Col lg="4" md="4" sm="3">
                  <label>National Identification Number</label>
                  <br />
                  <input
                    type="text/number"
                    name="identification_number"
                    value={formValues.NIN}
                    onChange={handleChange}
                    // onChange={formik.handleChange}
                    // value={formik.values.NIN}
                    placeholder=""
                    style={{ width: "100%", height: "35px" }}
                  ></input>
                </Col>
              </Row>
            </Container>
          </DialogContent>

          <DialogActions
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginRight: "20px",
            }}
          >
            <button
              onClick={() => handleSubmit(handleClose())}
              // onClick={handleClose}
              className="btn btn-primary bg-soft"
              type="submit"
            >
              Save
            </button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  )
}
