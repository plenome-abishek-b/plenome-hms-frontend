import React,{useState,useEffect} from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import api from "services/Api"

export default function OpdVisitDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
  handlePatientId
}) {
  const [openVisitDialog, setOpenVisitDialog] = React.useState(false)
  const [listPatient, setListPatient] = useState([])

  const [consdoctor,setConsdoctor] = useState('')
useEffect(()=>{
  handleConsultant()
  // handleBloodgroups()

},[])

const handleConsultant = async () =>{
  const response = await  api.getConsultant()
  const {data} = response
  setConsdoctor(data)
  console.log(data,"data")
}

  const handleClickOpen = () => {
    //dialog open
    setOpenVisitDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenVisitDialog(false)
  }


  useEffect(() => {
    getAllPatients()
  }, [])
  const getAllPatients = async () => {
    const response = await api.getPatient()
    const { data } = response
    console.log(data, "kkkkkkkkkkkkkkkkkkk")
    setListPatient(data)


  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">
        <h4>Patient Details</h4>
        <Container>
        <select
              style={{ width: "20%", height: "30px" }}
              name="patient_id"
              value={data.patient_id}
              onChange={handlePatientId}
            >
              {listPatient &&
                listPatient.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.patient_name}
                  </option>
                ))}
            </select>
        </Container>
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col lg="8">
              <Row>
                <Col>
                  <label>Height</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    style={{ height: "30px" }}
                  ></input>
                </Col>
                <Col>
                  <label>Weight</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    style={{ height: "30px" }}
                  ></input>
                </Col>
                <Col>
                  <label>BP</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    style={{ height: "30px" }}
                  ></input>
                </Col>
                <Col>
                  <label>Pulse</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    style={{ height: "30px" }}
                  ></input>
                </Col>
                <Col>
                  <label>Temperature</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    style={{ height: "30px" }}
                  ></input>
                </Col>
                <Col>
                  <label>Respiration</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    style={{ height: "30px" }}
                  ></input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Row>
                    <Col lg="4" md="4" sm="3">
                      <label>Symptoms </label>
                      <br />
                      <input
                        type="text"
                        placeholder=""
                        style={{ width: "100%", height: "30px" }}
                        id="symptoms" value={data.symptoms} onChange={e=>onChange(e)}
                      ></input>
                    </Col>
                    <Col lg="4" md="4" sm="3">
                      <label>Symptoms Title</label>
                      <br />
                      <input
                        type="text"
                        placeholder=""
                        style={{ width: "100%", height: "30px" }}
                      ></input>
                    </Col>
                    <Col lg="4" md="4" sm="3">
                      <label>Symptoms Description</label>
                      <br />
                      <input
                        type="text"
                        placeholder=""
                        style={{ width: "100%", height: "30px" }}
                      ></input>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="6" md="6" sm="2">
                  <label>Note</label>
                  <br />
                  <textarea
                    maxLength="infinity"
                    style={{ width: "100%" }}
                  ></textarea>
                </Col>
                <Col lg="6" md="6" sm="2">
                  <label>Any Known Allergies</label>
                  <br />
                  <textarea
                    maxLength="infinity"
                    style={{ width: "100%" }}
                  ></textarea>
                </Col>
              </Row>
            </Col>
            <Col lg="4">
              <div
                className="card p-4"
                style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
              >
                <Row>
                  <Col lg="12">
                    <label>Appointment Date</label>
                    <br />
                    <input placeholder="" style={{ width: "100%" }} id="appointment_date" value={data.appointment_date} onChange={e=>onChange(e)}></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Case</label>
                    <br />
                    <input placeholder="" style={{ width: "100%" }} id="case_type" value={data.case_type} onChange={e=>onChange(e)}></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Casualty</label>
                    <br />
                    <select style={{ width: "100%", height: "30px" }}>
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </Col>
                 
                  <Col>
                    <label>Old Patient</label>
                    <br />
                    <select style={{ width: "100%", height: "30px" }}>
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>TPA</label>
                    <br />
                    <select style={{ width: "100%", height: "30px" }}>
                      <option>select</option>
                    </select>
                  </Col>
                  <Col>
                    <label>Reference</label>
                    <br />
                    <input
                      placeholder=""
                      style={{ width: "100%", height: "30px" }}
                      id='refference' onChange={e=>onChange(e)} value={data.refference}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                <Col>
                    <label>Consultant</label>
                    <br />
                    <select style={{ width: "100%", height: "30px" }} id='cons_doctor' onChange={e=>onChange(e)} value={data.cons_doctor}>
                    <option>select one</option>
                    {consdoctor && consdoctor.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Charge Category</label>
                    <br />
                    <select style={{ width: "100%", height: "30px" }}>
                      <option>Select</option>
                    </select>
                  </Col>
                  <Col>
                    <label>Charge</label>
                    <br />
                    <select style={{ width: "100%" , height: "30px"}}>
                      <option>Select</option>
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Tax</label>
                    <br />
                    <input placeholder="%" style={{width: '100%', height: '30px'}}></input>
                  </Col>
                  <Col>
                    <label>Standard Charge(₹)</label>
                    <br />
                    <input placeholder="" style={{width: '100%', height: '30px'}}></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Applied Charge(₹)</label>
                    <br />
                    <input placeholder="" style={{width: '100%', height: '30px'}}></input>
                  </Col>
                  <Col>
                    <label>Amount(₹)</label>
                    <br />
                    <input placeholder="" style={{width: '100%', height: '30px'}}></input>
                  </Col>
                </Row>
                <br />
                <Row>
                    {/* <Col>
                       <label>Payment Mode</label>
                       <br />
                       <select style={{width: '100%', height: '30px'}} id="payment_mode" value={data.payment_mode} onChange={e=>onChange(e)}>
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Online">Online</option>
                       </select> 
                    </Col> */}
                    <Col>
                        <label>Paid Amount(₹)</label>
                        <br />
                        <input placeholder="" style={{width: '100%', height: '30px'}}></input>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <label>Live Consultation</label>
                        <br />
                        <select style={{width: '100%', height: '30px'}}>
                            <option>No</option>
                            <option>Yes</option>
                        </select>
                    </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-primary bg-soft btn-md" onClick={()=>handleFormSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
