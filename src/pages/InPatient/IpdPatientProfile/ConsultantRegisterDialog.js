import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { useEffect } from "react"
import api from "services/Api"
import { useState } from "react"
import {useParams} from 'react-router-dom'

export default function ConsultantRegisterDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  
  const [openCrDialog, setOpenCrDialog] = React.useState(false)
  const [doctors,setDoctors] = useState([])
  const{ipdno} = useParams()
  const [formData,setFormData] = useState({
    ipd_id:ipdno,
    date:'',
    ins_date:'',
    instruction:'',
    cons_doctor:'',
    create_at:'2023-12-05 11:11:11'
  })
  const handleClickOpen = () => {
    //dialog open
    setOpenCrDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
  }
  useEffect(() =>{
  fetchDoctors()
  },[])
  const fetchDoctors = async () =>{
    const response = await api.getDoctor()
    const {data} = response
    setDoctors(data)
  }
  const handleChange = (event) =>{
    const { name, value } = event.target
    console.log(value,name, "oooo")
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  console.log(formData)
  const handleSubmit = async() =>{
    const response = await api.postConstant(formData)
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
        <DialogTitle id="alert-dialog-title" className="bg-primary bg-soft text-primary">
        Add Consultant Register
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col lg='4' sm='12'>
                <label>Applied Date</label>
                <br />
                <input name="date" onChange={handleChange} value={formData.date} placeholder="" style={{width: '100%', height: '30px'}}></input>
            </Col>
            <Col lg='4' sm='12'>
                <label>Instruction Date</label>
                <br />
                <input name="ins_date" onChange={handleChange} value={formData.ins_date} placeholder="" style={{width: '100%' , height: '30px'}}></input>
            </Col>
            <Col lg='4' sm='12'>
                <label>Consultant Doctor</label>
                <br />
                <select style={{width: '100%' , height: '30px'}} name="cons_doctor" value={formData.cons_doctor} onChange={handleChange}>
                  <option>select one</option>
                  {doctors && doctors.map((doctor)=>(
                    <option key={doctor.staff_id} value={doctor.staff_id}>{doctor.name}</option>
                  ))}
                </select>
            </Col>
          </Row>
          <br />
          <Row>
          <Col lg='12' sm='12'>
          <label>Instruction</label>
            <br />
            <textarea  onChange={handleChange} value={formData.instruction} name="instruction" style={{width: '100%'}}></textarea>
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
