import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import OpdPatientDialog from "pages/OutPatient/OpdDialog/OpdPatientDialog"
import api from "services/Api"

export default function PathologybillDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
  patientId,
  setFetchData,
}) {
  var [date, setDate] = useState(new Date())
  const [openDialog, setOpenDialog] = React.useState(false)
  const [listPatient, setListPatient] = useState([])
  const [consdoctor, setConsdoctor] = useState("")
  const [testName, setTestName] = useState("")
  const [searchByPrescription, setSearchByPrescription] = useState("")

  // console.log(searchByPrescription, "prescription");

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  })

  useEffect(() => {
    getListPatients()
    handleConsDoctor()
    handleTestName()
    handleSearchByPrescription()
  }, [])
  const getListPatients = async () => {
    const response = await api.getPatient()
    const { data } = response
    console.log(data, "kkkkkkkkkkkkkkkkkkk")
    setListPatient(data)
  }

  const handleConsDoctor = async () => {
    const response = await api.getConsultant()
    const { data } = response
    setConsdoctor(data)
    console.log(data, "data")
  }

  const handleTestName = async () => {
    const response = await api.getPathologyTestName()
    const { data } = response
    setTestName(data)
    console.log(data, "data")
  }

  const handleSearchByPrescription = async () => {
    const response = await api.getPathologySearchByPrescription()
    const { data } = response
    setSearchByPrescription(data)
    console.log(data, "data")
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-primary"
          style={{ backgroundColor: "#6070FF" }}
        >
          <div>
            {" "}
            <select
              style={{
                width: "40%",
                height: "30px",
                border: "1px solid grey",
                borderRadius: "5px",
                marginRight: '-15px',
                position: 'relative',
                right: '25px'
              }}
              className="ms-3"
            >
              <option>select</option>
              {listPatient &&
                listPatient.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.patient_name}
                  </option>
                ))}
            </select>
            <button
              className="btn-mod ms-2 fw-bold"
              onClick={handleOpenDialog}
              style={{ marginRight: "48px", border: '1px solid white' }}
            >
              <i className="fa fa-plus"></i>&nbsp;Add Patient
            </button>
            <OpdPatientDialog
              open={openDialog}
              handleClose={handleCloseDialog}
              setFetchData={setFetchData}
            />
            {/* <select  style={{ width: "40%", height: "30px" }}
            className="ms-3" value={data.p_id} id="p_id" onChange={e=>onChange(e)} >
            <option>Select</option>
            {searchByPrescription &&
                searchByPrescription.map((presc) => (
                  <option key={presc.id} value={presc.id}>
                    {presc.p_id}
                  </option>
                ))}
          </select> */}
          </div>
        </DialogTitle>
        <DialogContent className="mt-2">
          <br />

          <h4 className="mt-3">Bill No</h4>
          <p
            className="text-dark fw-bold fs-5"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            Purchase Date & Time&nbsp;
            {date.toLocaleTimeString()}&nbsp;
            {date.toLocaleDateString()}
          </p>
          <div className="container">
            <Row>
              <Col lg="12">
                <Row>
                  <Col lg="4" md="4">
                    <label>Test Name <span className="text-danger">*</span></label>
                    <br />
                    <select
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      value={data.test_name}
                      id="test_name"
                      onChange={e => onChange(e)}
                    >
                      <option>Select</option>
                      {testName &&
                        testName.map(test => (
                          <option key={test.id} value={test.id}>
                            {test.test_name}
                          </option>
                        ))}
                    </select>
                  </Col>
                  <Col lg="4" md="4">
                    <label>Report Days</label>
                    <br />
                    <input
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                    ></input>
                  </Col>
                  <Col lg="4" md="4">
                    <label>Report Date <span className="text-danger">*</span></label>
                    <br />
                    <input
                      placeholder=""
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                    ></input>
                  </Col>
                </Row>

                <br />
                <Container>
                  <Row>
                    <Col lg="4" md="4">
                      <label>Tax</label>
                      <br />
                      <input
                        placeholder="%"
                        style={{
                          width: "90%",
                          height: "25px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                        value={data.tax_percentage}
                        id="tax_percentage"
                        onChange={e => onChange(e)}
                      ></input>
                    </Col>
                    <Col lg="4" md="4">
                      <label>Amount(₹)</label>
                      <br />
                      <input
                        placeholder=""
                        style={{
                          width: "90%",
                          height: "25px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                      ></input>
                    </Col>
                    <Col lg="4" md="4">
                      <label>Doctor Name</label>
                      <br />
                      <input
                        style={{
                          width: "90%",
                          height: "25px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                        id="doctor_name"
                        value={data.doctor_name}
                        onChange={e => onChange(e)}
                      ></input>
                    </Col>
                  </Row>

                  <br />
                  <Row>
                    <Col lg="">
                      <label>Note</label>
                      <br />
                      <textarea
                        maxLength="infinity"
                        style={{
                          width: "100%",
                          height: "55px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                      ></textarea>
                      <br />
                      <br />
                      <label>Referal Doctor</label>
                      <br />
                      <select
                        style={{
                          width: "100%",
                          height: "30px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                        value={data.name}
                        id="name"
                        onChange={e => onChange(e)}
                      >
                        <option>select</option>
                        {consdoctor &&
                          consdoctor.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>
                              {doctor.name}
                            </option>
                          ))}
                      </select>
                      <br />

                      <br />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col
                      style={{ backgroundColor: "rgba(0,0,0,0.1)", borderRadius: '5px', width:'100%' }}
                      className="p-4"
                      lg="12"
                    >
                      <br />
                      <Row className="ms-2">
                        <Col lg="3">
                          <label>Total(₹)</label>
                        </Col>
                        <Col lg="7">
                          <input
                            className="ms-3"
                            style={{
                              border: "none",
                              borderBottom: "1px solid black",
                              width: "100%",
                              textAlign: "end",
                            }}
                            placeholder="0"
                            value={data.balance_amount}
                            id="balance_amount"
                            onChange={e => onChange(e)}
                          ></input>
                        </Col>
                      </Row>
                      <br />
                      <Row className="ms-2">
                        <Col lg="3">
                          <label>Discount(₹)</label>
                        </Col>
                        <Col lg="7">
                          <input
                            className="ms-3"
                            style={{
                              border: "none",
                              borderBottom: "1px solid black",
                              width: "100%",
                              textAlign: "end",
                            }}
                            placeholder="0"
                          ></input>
                        </Col>
                      </Row>
                      <br />
                      <Row className="ms-2">
                        <Col lg="3">
                          <label>Tax(₹)</label>
                        </Col>
                        <Col lg="7">
                          <input
                            className="ms-3"
                            style={{
                              border: "none",
                              borderBottom: "1px solid black",
                              width: "100%",
                              textAlign: "end",
                            }}
                            placeholder="0"
                          ></input>
                        </Col>
                      </Row>
                      <br />
                      <Row className="ms-2">
                        <Col lg="3">
                          <label>Net Amount(₹)</label>
                        </Col>
                        <Col lg="7">
                          <input
                            className="ms-3"
                            style={{
                              border: "none",
                              borderBottom: "1px solid black",
                              width: "100%",
                              textAlign: "end",
                            }}
                            placeholder="0"
                            value={data.transaction_amount}
                            id="transaction_amount"
                            onChange={e => onChange(e)}
                          ></input>
                        </Col>
                      </Row>
                      <br />
                      <Row></Row>
                      <Row>
                        <Col lg='12'>
                          <label>Payment Mode</label>
                          <br />
                          <select style={{width: '100%', height: '30px', borderRadius: '5px', border: '1px solid grey'}}>
                            <option>Cash</option>
                            <option>UPI</option>
                            <option>Bank Transfer</option>
                            <option>Cheque</option>
                            <option>Online</option>
                          </select>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col lg='12'>
                          <label>Payment Amount(₹) <span className="text-danger">*</span></label>
                          <br />
                          <input
                            style={{ width: "100%", height: '30px', borderRadius: '5px', border: '1px solid grey' }}
                            value={data.net_amount}
                            id="net_amount"
                            onChange={e => onChange(e)}
                          ></input>
                        </Col>
                      </Row>

                      <br />
                      <Row>
                        <Col lg='12'>
                          <label>Payment Note</label>
                          <br />
                          <textarea
                            style={{ height: "35px", width: "100%", borderRadius: '5px', border: '1px solid grey' }}
                          ></textarea>
                        </Col>
                      </Row>

                      <div className="mt-4">
                        <button className="btn-mod bg-soft">
                          Calculate
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
            <br />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="btn-mod fw-bold"
            onClick={() => handleFormSubmit(handleClose())}
            autoFocus
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
