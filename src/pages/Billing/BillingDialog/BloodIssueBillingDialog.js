import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import api from "services/Api"
import OpdPatientDialog from "pages/OutPatient/OpdDialog/OpdPatientDialog"

export default function BloodIssueBillingDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
  patientId,
  setFetchData
}) {


  var [date, setDate] = useState(new Date())
  const [openDialog, setOpenDialog] = React.useState(false);
  const [listPatient, setListPatient] = useState([])
  const [consdoctor,setConsdoctor] = useState('')
  const [bloodgroupData,setBloodgroupData] = useState('')
  const [chargeCategory,setchargeCategory] = useState('')
  const [chargeName,setchargeName] = useState('')
  const [bloodIssueBag,setBloodIssueBag] = useState('')

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  })


  useEffect(() => {
    getListPatients()
    handleConsDoctor()
    handleBloodgroup()
    handleChargeCategory()
    handleChargeName()
    handleIssueBagName()
  }, [])


  const getListPatients = async () => {
    const response = await api.getPatient()
    const { data } = response
    console.log(data, "kkkkkkkkkkkkkkkkkkk")
    setListPatient(data)


  }

  const handleConsDoctor = async () =>{
    const response = await  api.getConsultant()
    const {data} = response
    setConsdoctor(data)
    console.log(data,"data")
  }

  const handleBloodgroup = async () =>{
    const response = await  api.getBloodBank()
    const {data} = response
    setBloodgroupData(data)
    console.log(data,"data")
  }

  const handleChargeCategory = async () =>{
    const response = await  api.getChargeCategory()
    const {data} = response
    setchargeCategory(data)
    console.log(data,"data")
  }

  const handleChargeName = async () =>{
    const response = await  api.getChargeName()
    const {data} = response
    setchargeName(data)
    console.log(data,"data")
  }

  const handleIssueBagName = async () =>{
    const response = await  api.getBillingBloodIssueBag()
    const {data} = response
    setBloodIssueBag(data)
    console.log(data,"data")
  }


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  // console.log(searchByPrescription, "prescription");
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
          className="bg-primary bg-soft text-primary"
        >
          <div>
            {" "}
            <select style={{ width: "40%", height: "40px" }} id="patient_id"
              value={data.patient_id}
              onChange={e=>onChange(e)} >
              <option>select</option>
              {listPatient &&
                listPatient.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.patient_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mt-1 d-flex justify-content-end">
            <button
              className="btn-mod"
              style={{
                marginRight: "48px",
                position: "fixed",
                top: "50px",
                left: "810px",
              }}
              onClick={handleOpenDialog}
            >
              <i className="fa fa-plus"></i>&nbsp;Add Patient
            </button>
            <OpdPatientDialog
              open={openDialog}
              handleClose={handleCloseDialog} setFetchData={setFetchData} />
          </div>
        </DialogTitle>
        <DialogContent className="mt-2">
          <br />
          <Container>
            <Row>
              <Col lg="6" md="6" sm="12">
                <label>Issue Date</label>
                <br />
                <input style={{ width: "100%", height: "25px" }} value={data.date_of_issue} id="date_of_issue" onChange={e=>onChange(e)} ></input>
              </Col>
              <Col lg="6" md="6" sm="12">
                <label>Hospital Doctor</label>
                <br />
                <select style={{ width: "100%", height: "25px" }} value={data.name} id="name" onChange={e=>onChange(e)} >
                  <option>select</option>
                  {consdoctor &&
                consdoctor.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
                </select>
              </Col>
            </Row>
            <br />
            <Row>
            <Col lg="6" md="6" sm="12">
                <label>Reference Name</label>
                <br />
                <input
                  placeholder=""
                  style={{ width: "100%", height: "25px" }} value={data.reference} id="reference" onChange={e=>onChange(e)}
                ></input>
              </Col>
              <Col lg="6" md="6" sm="12">
                <label>Technician</label>
                <br />
                <input style={{ width: "100%", height: "25px" }} value={data.technician} id="technician" onChange={e=>onChange(e)} ></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="4" md="4" sm="12">
                <label>Blood Group</label>
                <br />
                <select style={{ width: "100%", height: "25px" }} name="blood_group"
               value={data.blood_group}
                  onChange={e=>onChange(e)} >
                  <option>select</option>
                  {bloodgroupData && bloodgroupData.map((bloodgroup) => (
                    <option key={bloodgroup.name} value={bloodgroup.name}>
                      {bloodgroup.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col lg="4" md="4" sm="12">
                <label>Bag</label>
                <br />
                <select style={{ width: "100%", height: "25px" }} value={data.bag_no} id="bag_no" onChange={e=>onChange(e)} >
                  <option>Select</option>
                  {bloodIssueBag &&
                bloodIssueBag.map((bag) => (
                  <option key={bag.id} value={bag.id}>
                    {bag.bag_no}
                  </option>
                ))}
                </select>
              </Col>
              <Col lg="4" md="4" sm="12">
                <label>Charge Category</label>
                <br />
                <select style={{ width: "100%", height: "25px" }} id='category' onChange={e=>onChange(e)} value={data.category} >
                  <option>select</option>
                  {chargeCategory && chargeCategory.map((ccategory) => (
                      <option key={ccategory.id} value={ccategory.id}>
                        {ccategory.name}
                      </option>
                    ))}
                </select>
              </Col>
              <Col lg="4" md="4" sm="12">
                <br />
                <label>Charge Name</label>
                <br />
                <select style={{ width: "100%", height: "25px" }} id='name' onChange={e=>onChange(e)} value={data.name} >
                  <option>select</option>
                  {chargeName && chargeName.map((cname) => (
                    <option key={cname.id} value={cname.id}>
                      {cname.name}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="12">
                <label>Standard Charge</label>
                <br />
                <input style={{ width: "100%", height: "25px" }} value={data.standard_charge} id="standard_charge" onChange={e=>onChange(e)} ></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="6" md="6" sm="12">
                <label>Note</label>
                <br />
                <textarea style={{ width: "100%", height: "55px" }} value={data.remark} id="remark" onChange={e=>onChange(e)} ></textarea>
                <br />
                {/* <label>Blood Qty</label>
                <br />
                <input style={{ width: "100%", height: "25px" }}></input> */}
              </Col>
              <Col lg="6" md="6" sm="12">
                <Row>
                  <label>Total</label>
                  <br />
                  <input
                    style={{
                      border: "none",
                      borderBottom: "1px solid black",
                      width: "100%",
                      textAlign: "end",
                    }}
                    value={data.amount} id="amount" onChange={e=>onChange(e)} ></input>
                </Row>
                <br />
                <Row>
                  <label>Discount</label>
                  <br />
                  <input
                    style={{
                      border: "none",
                      borderBottom: "1px solid black",
                      width: "100%",
                      textAlign: "end",
                    }} value={data.discount_percentage} id="discount_percentage" onChange={e=>onChange(e)}
                  ></input>
                </Row>
                <br />
                <Row>
                  <label>Tax</label>
                  <br />
                  <input
                    style={{
                      border: "none",
                      borderBottom: "1px solid black",
                      width: "100%",
                      textAlign: "end",
                    }} value={data.tax_percentage} id="tax_percentage" onChange={e=>onChange(e)}
                  ></input>
                </Row>
                <br />
                <Row>
                  <label>Net Amount</label>
                  <br />
                  <input
                    style={{
                      border: "none",
                      borderBottom: "1px solid black",
                      width: "100%",
                      textAlign: "end",
                    }} value={data.net_amount} id="net_amount" onChange={e=>onChange(e)}
                  ></input>
                </Row>
                <br />
                <Row>
                  <label>Payment Mode</label>
                  <br />
                  <select>
                    <option>select</option>
                    <option>Cash</option>
                    <option>Cheque</option>
                    <option>UPI</option>
                  </select>
                </Row>
                <br />
                <Row>
                  <label>Payment Amount</label>
                  <br />
                  <input  ></input>
                </Row>
              </Col>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          <button
            className="btn-mod"
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