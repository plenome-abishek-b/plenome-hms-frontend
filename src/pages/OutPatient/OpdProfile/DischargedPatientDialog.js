import React,{useState,useEffect} from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import api from "services/Api"

export default function OPDdischargedPatientDialog({
    open,
    opdId,
 handleClose,
     data,
//   onChange,
//   handleFormSubmit,
//   handlePatientId
}) {
    console.log(opdId,"opdid");
  const [openVisitDialog, setOpenVisitDialog] = React.useState(false)
  const [listPatient, setListPatient] = useState([])
  const [show,setShow] = useState('')
  const [formData,setFormData] = useState({
    opd_details_id:Number(opdId),
    discharge_by:"",
    discharge_date:"",
    discharge_status:3, // death - 1,refferal-2,normal-3
    death_date:"",// if discharge_status = 1
    refer_date: "",// if discharge_status = 2
    refer_to_hospital: "",// if discharge_status = 2
    reason_for_referral: "",// if discharge_status = 2
    operation:"",
    diagnosis:"",
    investigations:"",
    treatment_home:"",
    note:"",
    is_active:"no",
    discharged:"yes",
    attachment:"",// if discharge_status = 1
    attachment_name:"",// if discharge_status = 1
    death_report:"",// if discharge_status = 1
    Hospital_id:1
  })
   const [consdoctor,setConsdoctor] = useState('')
useEffect(()=>{
  handleConsultant()
  // handleBloodgroups()

},[])
const handleFormSubmit = async () =>{
   console.log(formData,"formData")
   const response = await api?.post_OPD_dischargedPatinet(formData);
   const {data} = response;
   console.log(data,"all response");
}

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
  const handlechange = (e) =>{
   const {id,value} = e.target
   setFormData({
    ...formData,[id] : value
   })
  }
  const handleDischarge_status = (value) =>{
    console.log(value,"value");
    setShow(value);
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
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title" className="text-white fw-bold" 
                style={{backgroundColor: '#92A4FF', height: '60px'}}>
        <h4>Discharged patient</h4>
        <Container style={{paddingTop: '35px' , position: 'relative' , right: '5px' }}>
        {/* <select
              style={{width: '23%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}}
              name="patient_id"
              value={data?.patient_id}
              onChange={handlePatientId}
            > */}
              {/* {listPatient &&
                listPatient.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.patient_name}
                  </option>
                ))}*/}
            {/* </select>  */}
        </Container>
        </DialogTitle>
        <DialogContent className="mt-4 ms-2" style={{paddingTop: '55px'}}>
          <Row>
            <Col>
              <Row>
                <Col lg='6'>
                  <label >Discharged Date</label>
                  <br />
                  <input
                    placeholder=""
                    type="date"
                    onChange={handlechange}
                    id="discharge_date"
                    value={formData?.discharge_date}
                    style={{height: '30px', borderRadius: '5px', border: "1px solid grey" , width: '100%'}}
                  ></input>
                </Col>
                <Col lg='6'>
                  <label>Discharged status</label>
                  <br />
                  {/* <input
                    type="number"
                    placeholder=""
                    style={{height: '30px' , borderRadius: '5px', border: "1px solid grey" , width: '100%' }}
                  ></input> */}
                  <select value={formData?.discharge_status} id="discharge_status" style={{height: '30px' , borderRadius: '5px', border: "1px solid grey" , width: '100%' }}
                    onChange={handlechange}
                    onClick={(e)=>handleDischarge_status(e.target.value)}
                    >
                    <option>select</option>
                    <option value={1}>Death</option>
                    <option value={2}>Refferal</option>
                    <option value={3}>Normal</option>
                  </select>
                </Col>
                <Col lg='6'>
                  <label style={{paddingTop: '10px'}}>Note</label>
                  <br />
                  <textarea
                    maxLength="infinity"
                    onChange={handlechange}
                    id="note"
                    value={formData?.note}
                    style={{height: '50px' , borderRadius: '5px', border: "1px solid grey" , width: '100%' }}
                  ></textarea>
                </Col>
                <Col lg='6'>
                  <label style={{paddingTop: '10px'}}>Operation</label>
                  <br />
                  <input
                    type="text"
                    onChange={handlechange}
                    value={formData?.operation}
                    id="operation"
                    placeholder=""
                    style={{height: '30px' , borderRadius: '5px', border: "1px solid grey" , width: '100%'  }}
                  ></input>
                </Col>
                <Col lg='6'>
                  <label style={{paddingTop: '10px'}}>Diagnosis</label>
                  <br />
                  <input
                    type="text"
                    onChange={handlechange}
                    value={formData?.diagnosis}
                    id="diagnosis"
                    placeholder=""
                    style={{height: '30px' , borderRadius: '5px', border: "1px solid grey" , width: '100%'  }}
                  ></input>
                </Col>
                <Col lg='6'>
                  <label style={{paddingTop: '10px'}}>Investigation</label>
                  <br />
                  <input
                    type="investigation"
                    onChange={handlechange}
                    id="investigations"
                    value={formData?.investigations}
                    placeholder=""
                    style={{height: '30px' , borderRadius: '5px', border: "1px solid grey" , width: '100%' }}
                  ></input>
                </Col>
                <Col lg='6'>
                  <label style={{paddingTop: '10px'}}>Treatment at home</label>
                  <br />
                  <input
                    type="text"
                    onChange={handlechange}
                    id="treatment_home"
                    value={formData?.treatment_home}
                    placeholder=""
                    style={{height: '30px' , borderRadius: '5px', border: "1px solid grey" , width: '100%' }}
                  ></input>
                </Col>
                {show == 1 &&
                <><Col lg='6'>
                                      <label style={{ paddingTop: '10px' }}>Death date</label>
                                      <br />
                                      <input
                                          onChange={handlechange}
                                          type="date"
                                          id="death_date"
                                          value={formData?.death_date}
                                          placeholder=""
                                          style={{ height: '30px', borderRadius: '5px', border: "1px solid grey", width: '100%' }}
                                      ></input>
                                  </Col>
                                      <Col lg='6'>
                                      <label style={{ paddingTop: '10px' }}>Attachment</label>
                                      <br />
                                      <input
                                          onChange={handlechange}
                                          type="image"
                                          id="attachment"
                                          value={formData?.attachment}
                                          placeholder=""
                                          style={{ height: '30px', borderRadius: '5px', border: "1px solid grey", width: '100%' }}
                                      ></input>
                                  </Col>
                                  <Col lg='6'>
                                          <label style={{ paddingTop: '10px' }}>Death Reports</label>
                                          <br />
                                          <input
                                              onChange={handlechange}
                                              type="text"
                                              id="death_report"
                                              value={formData?.death_report}
                                              placeholder=""
                                              style={{ height: '30px', borderRadius: '5px', border: "1px solid grey", width: '100%' }}
                                          ></input>
                                      </Col></>
                }
                {show === 2 &&
                <>
                <Col lg='6'>
                                      <label style={{ paddingTop: '10px' }}>Refferal date</label>
                                      <br />
                                      <input
                                          onChange={handlechange}
                                          type="date"
                                          id="death_date"
                                          value={formData?.death_date}
                                          placeholder=""
                                          style={{ height: '30px', borderRadius: '5px', border: "1px solid grey", width: '100%' }}
                                      ></input>
                                  </Col>
                                  <Col lg='6'>
                                      <label style={{ paddingTop: '10px' }}>Refferal Hosptial Name</label>
                                      <br />
                                      <input
                                          onChange={handlechange}
                                          type="date"
                                          id="death_date"
                                          value={formData?.refer_to_hospital}
                                          placeholder=""
                                          style={{ height: '30px', borderRadius: '5px', border: "1px solid grey", width: '100%' }}
                                      ></input>
                                  </Col>
                                  <Col lg='6'>
                                      <label style={{ paddingTop: '10px' }}>Reason for refferal</label>
                                      <br />
                                      <input
                                          onChange={handlechange}
                                          type="date"
                                          id="reason_for_referral"
                                          value={formData?.reason_for_referral}
                                          placeholder=""
                                          style={{ height: '30px', borderRadius: '5px', border: "1px solid grey", width: '100%' }}
                                      ></input>
                                  </Col>
                </>
                }
              </Row>
              <br />
              {/* <Row>
                <Col>
                  <Row>
                    <Col lg="4" md="4" sm="3">
                      <label>Symptoms </label>
                      <br />
                      <input
                        type="text"
                        placeholder=""
                        style={{ width: "100%", height: "30px" , borderRadius: '5px', border: "1px solid grey" }}
                        id="symptoms" value={data?.symptoms} onChange={e=>onChange(e)}
                      ></input>
                    </Col>
                    <Col lg="4" md="4" sm="3">
                      <label>Symptoms Title</label>
                      <br />
                      <input
                        type="text"
                        placeholder=""
                        style={{ width: "100%", height: "30px" , borderRadius: '5px', border: "1px solid grey"}}
                      ></input>
                    </Col>
                    <Col lg="4" md="4" sm="3">
                      <label>Symptoms Description</label>
                      <br />
                      <input
                        type="text"
                        placeholder=""
                        style={{ width: "100%", height: "30px" , borderRadius: '5px', border: "1px solid grey"}}
                      ></input>
                    </Col>
                  </Row>
                </Col>
              </Row> */}
              <br />
              {/* <Row>
                <Col lg="6" md="6" sm="2">
                  <label>Note</label>
                  <br />
                  <textarea
                    maxLength="infinity"
                    style={{ width: "100%" , borderRadius: '5px', border: "1px solid grey"}}
                  ></textarea>
                </Col>
                <Col lg="6" md="6" sm="2">
                  <label>Any Known Allergies</label>
                  <br />
                  <textarea
                    maxLength="infinity"
                    style={{ width: "100%" , borderRadius: '5px', border: "1px solid grey" }}
                  ></textarea>
                </Col>
              </Row> */}
            </Col>
          
          </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleFormSubmit()} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
