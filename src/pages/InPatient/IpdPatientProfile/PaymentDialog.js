import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { useState } from "react"
import api from "services/Api"
import { useEffect } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom"
import { responsiveArray } from "antd/es/_util/responsiveObserve"

export default function PaymentDialog({
  patient,
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
  // patient
}) {
  const [openCrDialog, setOpenCrDialog] = React.useState(false)
  const [patientId,setPatientId] = useState([])
 
  
    // const [open, setOpen] = React.useState(false);
  console.log(patient,"kokokoko")
  const {ipdno} = useParams()
  
  useEffect(()=>{
    handlePatient()
  },[])
  const handlePatient =async () =>{
    const response = await api.getPatientId(ipdno)
    const {data} = response
    console.log("response",response)
    console.log(data,"datrrrrrr")
    setPatientId(data)

  }

  console.log(patientId[0]?.patient_id,"fiiiii")
  
  const[formData,setFormData] = useState({
    amount:'',
    patient_id:null,
    section:'IPD',
    note:'',
    payment_date:'',
    payment_mode:'',
    created_at:'2020-10-03 11:11:11'
  })  
  useEffect(() => {
    if (patientId && patientId.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        patient_id: patientId[0]?.patient_id
      }));
    }
  }, [patientId]);
  const handleClickOpen = () => {
    //dialog open
    setOpenCrDialog(true)
  }
  


    
  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
  }
  const handleChange = (event) =>{
    const {value,name} = event.target
 setFormData({...formData,
            [name] : value})

  }
  const handleSubmit =  async() =>{
  const response = await api.postPayment(formData)
  const {data} = response
  console.log(data,"koko")
  }
  console.log(formData,"FORM DATAA")

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
        <DialogTitle id="alert-dialog-title" className="text-white fw-bold" style={{backgroundColor: '#92A4FF', height: '60px'}}>
        Add Payments
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col lg='6' sm='12'>
             <label>Date <span className="text-danger">*</span></label>
             <br />
             <input onChange={handleChange} value={formData.payment_date} name="payment_date" type="date" style={{width: '100%', height: '30px', borderRadius: '5px', border: "1px solid grey"}}></input>
            </Col>
            <Col lg='6' sm='12'> 
            <label>Amount(₹) <span className="text-danger">*</span></label>
            <br />
            <input onChange={handleChange} value={formData.amount} placeholder="100" name="amount" style={{width: '100%', height: '30px', borderRadius: '5px', border: "1px solid grey"}}></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' sm='12'>
                <label>Payment Mode</label>
                <br />
                <select style={{width: '100%', height: '30px', borderRadius: '5px', border: "1px solid grey"}} name="payment_mode" onChange={handleChange} value={formData.payment_mode}>
                    <option value="UPI">UPI</option>
                    <option value="cash">Cash</option>
                    <option value="Gpay">Gpay</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Online">Online</option>
                </select>
            </Col>
           </Row>
           <br />
           <Row>
           <Col lg='12' sm='12'>
                <label>Note</label>
                <br />
                <textarea name="note" onChange={handleChange} value={formData.note} style={{width: '100%', borderRadius: '5px', border: "1px solid grey"}}></textarea>
            </Col>
           </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-primary bg-soft btn-md" onClick={()=>handleSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
