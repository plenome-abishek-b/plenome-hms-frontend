import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"
// import PatientPathologyDialog from "./Patientdialog"

export default function RadiologyBillDialog({ open, handleClose }) {
  var [date, setDate] = useState(new Date())
  const [openDialog, setOpenDialog] = React.useState(false)
  const [doctor, setDoctor] = useState([])
  const currentDate = new Date()
  const val = "2023-09-09 11:11:11"
  const reportingDate =
    val?.report_date instanceof Date
      ? val?.report_date.toISOString().split("T")[0]
      : ""
  const [formValue, setFormValue] = useState({
    ipd_prescription_basic_id: "",
    doctor_id: "",
    date: "2023-09-09 11:11:11",
    doctor_name: "",
    total: "",
    discount_percentage: "",
    tax: "",
    net_amount: "",
    vaction_id: "",
    note: "",
    patient_id: "",
    reporting_date: "",
    reporting_day: "",
    radiology_billing_id: null,
    radiology_id: "",
    amount_type: "cash",
    payment_mode: "",
    amount: "",
    tax_percentage: "",
    consultant_doctor: 2,
    radiology_center: "dd",
    apply_charge: "",
    section: "radiology",
    radiology_bill_id: null,
    case_reference_id: 1,
    generated_by: 1,
    payment_date: "2023-01-01 11:11:11",
    // payment_date:'2021-11-12',
    collection_date: "2021-12-02",
    created_at: "2021-12-02 11:11:11",
    transaction_id: null,
  })
  const [searchedData, setsearchedData] = useState([])
  const [patient, setAllpatient] = useState([])
  console.log(patient, "ppa ee")
  // const handleChange = (event) =>{
  //   const {name,value} = event.target
  //   setFormValue({
  //       ...formValue,[name]:value
  //   })
  // }
  // const handleChange = event => {
  //   const { name, value } = event.target
  //   if (
  //     name === "reporting_day" ||
  //     name === "reporting_date" ||
  //     name === "amount" ||
  //     name === "tax"
  //   ) {
  //     const updatedSearchedData = searchedData.map(data => ({
  //       ...data,
  //       [name]: value,
  //     }))
  //     setsearchedData(updatedSearchedData)
  //     setFormValue({
  //       ...formValue,
  //       [name]: value,
  //     })
  //   } else {
  //     setFormValue({
  //       ...formValue,
  //       [name]: value,
  //     })
  //   }
  // }
  const handleChange = event => {
    const { name, value } = event.target

    if (
      name === "reporting_day" ||
      name === "reporting_date" ||
      name === "amount" ||
      name === "tax"
    ) {
      const updatedSearchedData = searchedData.map(data => ({
        ...data,
        [name]: value,
      }))
      setsearchedData(updatedSearchedData)
    }

    setFormValue({
      ...formValue,
      [name]: value,
    })
  }

  console.log(formValue.prescriptionNo, "prno")
  useEffect(() => {
    getDoctors()
    getAllpatients()
  }, [])
  const getAllpatients = async () => {
    const response = await api.getAllPatients()
    const { data } = response
    setAllpatient(data)
  }
  const getDoctors = async () => {
    const response = await api.getDoctor()
    const { data } = response
    console.log(data, "doctors")
    setDoctor(data)
  }
  useEffect(() => {
    const futureDate = new Date(date.getTime() + 5 * 24 * 60 * 60 * 1000) // Adding 4 days in milliseconds
    var timer = setInterval(() => setDate(new Date()), 1000)
    setDate(futureDate)

    return function cleanup() {
      clearInterval(futureDate)
    }
  }, [])

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const searchByprescipationNo = async () => {
    const response = await api.getSearchPrescriptionNo(
      formValue.ipd_prescription_basic_id
    )
    const { data } = response
    setsearchedData(data)
    console.log(data, "data wa ea")
  }
  //   const handleSubmit = async () => {
  //     const response = await api.postRadilogyTransactions(formValue)
  //     const { data } = response
  //     handleTransactionId(data)
  //   }
  //   const handleTransactionId = async datas => {
  //     setFormValue(prevFormData => ({
  //       ...prevFormData,
  //       transaction_id: datas?.data,
  //     }))
  //   }
  //   useEffect(() => {
  //     handleRadilogyBill(formValue)
  //   }, [formValue])
  //   const handleRadilogyBill = async (formValue) => {
  //     const response = await api.postRadiologyBill(formValue)
  //     const {data} = response
  //     handleRadiologyBillId(data)
  //   }
  //   const handleRadiologyBillId = async (datas) =>{
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       radiology_billing_id: datas?.data,
  //     }));
  //     handleRadilogyReport()
  //   }
  //   // useEffect(() => {
  //   //   handleRadilogyReport(formValue)
  //   // },[formValue])
  //   const handleRadilogyReport =async () =>{
  // const response = await api.postRadiologyReport()
  //   }

  const handleSubmit = async () => {
    const transactionResponse = await api.postRadilogyTransactions(formValue)
    const transactionData = transactionResponse.data
    setFormValue(prevFormData => ({
      ...prevFormData,
      transaction_id: transactionData.data,
    }))

    const billResponse = await api.postRadiologyBill(formValue)
    const billData = billResponse.data
    setFormValue(prevFormData => ({
      ...prevFormData,
      radiology_billing_id: billData.data,
      radiology_bill_id: billData.data,
    }))
    // handleUpdatedBillId()
    handleRadiologyReport()
  }
  // const handleUpdatedBillId = async () =>{
  //   const reponse = await api.getUpdatedBill(formValue.radiology_billing_id,formValue)
  // }

  const handleRadiologyReport = async () => {
    const reportResponse = await api.postRadiologyReport(formValue)
    // Handle the response or any additional logic here
  }

  console.log(formValue, "radiology form")
  console.log(searchedData, "fff")
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
          className="text-white fw-bold"
          style={{ backgroundColor: "#92A4FF" }}
        >
          Bill No
          <div className="mt-2">
            {" "}
            <select
              style={{ width: "40%", height: "30px", borderRadius: "5px" }}
              className="ms-3"
              name="patient_id"
              onChange={handleChange}
              value={formValue.patient_id}
            >
              <option
                key={searchedData[0]?.patient_id}
                value={searchedData[0]?.patient_id}
              >
                {searchedData[0]?.patient_name}
              </option>
              <option>select one</option>
              {patient.map(val => (
                <option key={val.id} value={val.id}>
                  {val.patient_name}
                </option>
              ))}
            </select>
            <input
              placeholder="search"
              onChange={handleChange}
              name="ipd_prescription_basic_id"
              value={formValue.ipd_prescription_basic_id}
              style={{
                width: "40%",
                height: "30px",
                borderRadius: "5px",
                border: "1px solid grey",
              }}
              className="ms-5"
            ></input>
            <button
              onClick={searchByprescipationNo}
              className="btn btn-primary btn-sm"
            >
              go
            </button>
          </div>
          <div className="mt-4 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleOpenDialog}>
              <i className="fa fa-plus"></i>&nbsp;Add Patient
            </button>
            <PatientDialog open={openDialog} handleClose={handleCloseDialog} />
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
                {searchedData.map(val => (
                  <Row>
                    <Col lg="4" md="4">
                      <label>Test Name</label>
                      <br />
                      <select
                        name="radiology_id"
                        onChange={handleChange}
                        value={formValue.radiology_id}
                        style={{
                          width: "90%",
                          height: "25px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                      >
                        <option key={val.id} value={val.id}>
                          {val?.test_name}
                        </option>
                        <option>select one</option>
                      </select>
                    </Col>
                    <Col lg="4" md="4">
                      <label>Report Days</label>
                      <br />
                      <input
                        onChange={handleChange}
                        name="reporting_day"
                        value={val?.report_days}
                        style={{
                          width: "90%",
                          height: "25px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                      ></input>
                    </Col>
                    <Col lg="4" md="4">
                      <label>Report Date</label>
                      <input
                        onChange={handleChange}
                        name="reporting_date"
                        value={
                          reportingDate ||
                          (currentDate instanceof Date
                            ? currentDate.toISOString().split("T")[0]
                            : "")
                        }
                        style={{
                          width: "90%",
                          height: "25px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                      ></input>
                      <br />
                    </Col>
                  </Row>
                ))}
                <br />
                {searchedData.map(val => (
                  <Row>
                    <Col lg="6" md="6">
                      <label>Tax</label>
                      <br />
                      <input
                        name="tax"
                        onChange={handleChange}
                        placeholder="%"
                        value={val.percentage}
                        style={{
                          width: "100%",
                          height: "25px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                      ></input>
                    </Col>
                    <Col lg="6" md="6">
                      <label>Amount(₹)</label>
                      <br />
                      <input
                        name="amount"
                        onChange={handleChange}
                        placeholder=""
                        value={val.standard_charge}
                        style={{
                          width: "100%",
                          height: "25px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                      ></input>
                    </Col>
                  </Row>
                ))}
                <br />
                <Row>
                  <Col lg="12">
                    <label>Note</label>
                    <br />
                    <textarea
                      maxLength="infinity"
                      style={{ width: "100%", height: "55px", border: '1px solid grey', borderRadius: '5px' }}
                    ></textarea>
                    <br />
                    <br />
                    <label>Referal Doctor</label>
                    <br />
                    <select
                      name="doctor_id"
                      value={formValue.doctor_id}
                      style={{ width: "100%",height: '30px', border: '1px solid grey', borderRadius: '5px'  }}
                      onChange={handleChange}
                    >
                      <option>select</option>
                      {doctor.map(val => (
                        <option key={val.staff_id} value={val.staff_id}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                    <br />
                    <br />
                    <label>Doctor Name</label>
                    <br />
                    <input
                      name="doctor_name"
                      onChange={handleChange}
                      value={formValue.doctor_name}
                      style={{ width: "100%",height: '30px', border: '1px solid grey', borderRadius: '5px' }}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col
                    style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
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
                          name="total"
                          onChange={handleChange}
                          value={formValue.total}
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
                        <label>Discount(%)</label>
                      </Col>
                      <Col lg="7">
                        <input
                          name="discount_percentage"
                          onChange={handleChange}
                          value={formValue.discount_percentage}
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
                    <Row>
                      <Col lg="3">
                        <label>Discount(₹)</label>
                      </Col>
                      <Col lg="7">
                        <input
                          name="discount"
                          onChange={handleChange}
                          value={formValue.discount}
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
                          value={formValue.tax_percentage}
                          onChange={handleChange}
                          name="tax_percentage"
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
                          name="net_amount"
                          value={formValue.net_amount}
                          onChange={handleChange}
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
                    <Row></Row>
                    <Row>
                      <Col lg='12'>
                        <label>Payment Mode</label>
                        <br />
                        <select
                          name="payment_mode"
                          onChange={handleChange}
                          value={formValue.payment_mode}
                          style={{width: '100%', height: '30px', border: '1px solid grey', borderRadius: '5px'}}
                        >
                          <option value="cash">Cash</option>
                          <option value="upi">UPI</option>
                          <option value="bank_transfer">Bank Transfer</option>
                          <option value="cheque">Cheque</option>
                          <option value="online">Online</option>
                        </select>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col lg='12'>
                        <label>Payment Amount(₹)</label>
                        <br />
                        <input
                          name="apply_charge"
                          onChange={handleChange}
                          value={formValue.apply_charge}
                          style={{width: '100%', height: '30px', border: '1px solid grey', borderRadius: '5px'}}
                        ></input>
                      </Col>
                    </Row>

                    <br />
                    <Row>
                      <Col lg='12'>
                        <label>Payment Note</label>
                        <br />
                        <textarea
                          style={{ width: '100%', height: '30px', border: '1px solid grey', borderRadius: '5px' }}
                        ></textarea>
                      </Col>
                    </Row>
                    <div className="mt-4">
                      <button className="btn btn-primary bg-soft">
                        Calculate
                      </button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <br />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="btn btn-primary"
            onClick={() => handleSubmit(handleClose())}
            autoFocus
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
