import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField, formatMs } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { useEffect } from "react"
import api from "services/Api"
import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export default function MedicationDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [medicineCategory,setMedicineCategory] = useState([])
  const [medicineName,setMedicineName] = useState([])
  const [medicineDosage,setMedicineDosage] = useState([])
  const handleClickOpen = () => {
    //dialog open
    setOpenDialog(true)
  }

  const {ipdno} = useParams()
  const [formValue,setFormValue] = useState({
    medicine_category:'',
    medicine_name:'',
    date:'',
    time:'',
    remark:'',
    medicine_dosage_id:'',
    pharmacy_id:'',
    created_at:'2012-03-11 11:11:11',
    ipd_id:ipdno
  })
  useEffect(()=>{
   fetchMedicineCategory()
  },[])

  const fetchMedicineCategory = async () =>{
    const response = await api.getMedicationCategroy()
    const {data} = response
    console.log(data,"medicineCategory")
    setMedicineCategory(data)

  }

  const handleDialogClose = () => {
    //dialog close
    setOpenDialog(false)
  }
  const handleChange = (event) =>{
   const {name,value} = event.target
   setFormValue({
    ...formValue,[name]:value
   })
  }
  console.log(formValue.medicine_category,"kkkku")
  const handleMeidcineName = async () =>{
    const response = await api.getMedicneName(formValue.medicine_category)
    const {data} = response
    console.log(data,"medicineName")
    setMedicineName(data)
  }
  const handleMedicineDose = async ()=>{
    const response = await api.getMedicineDosage()
    const {data} = response
    console.log(data,"dosage")
    setMedicineDosage(data)
  }
  const handleSubmit = async () =>{
    const response = await api.postMedication(formValue)
  }
  console.log(formValue,"medicine_name")
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
        Add Medication Dose
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col lg='12' sm='12'>
                <label>Date</label>
                <br />
                <input name="date" onChange={handleChange} value={formValue.date} placeholder="" style={{width: '100%', height: '30px'}}></input>
            </Col>
            <Col lg='12' sm='12'>
                <label>Time</label>
                <br />
                <input name="time" onChange={handleChange} value={formValue.time} placeholder="" type="time" style={{width: '100%' , height: '30px'}}></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='12' sm='12'>
                <label>Medicine Category</label>
                <br />
                <select style={{width: '100%', height: '30px'}} name="medicine_category" onChange={handleChange} value={formValue.medicine_category}>
                  <option>select one</option>
                  {medicineCategory && medicineCategory.map((val=>(
                    <option key={val.id} value={val.id}>{val.medicine_category}</option>
                  )))}
                </select>
            </Col>
            <Col lg='12' sm='12'>
                <label className="mt-3">Medicine Name</label>
                <br />
                <select name="pharmacy_id" style={{width: '100%', height: '30px'}} onClick={()=>handleMeidcineName()} onChange={handleChange} value={formValue.pharmacy_id}>
                  <option>Select</option>
                  {medicineName && medicineName.map((val=>(
                    <option key={val.id} value={val.id} >{val.medicine_name}</option>
                  )))}
                </select>
            </Col>
          </Row>
          <br />
          <Row>
          <Col lg='12' sm='12'>
                <label className="mt-3">Dosage</label>
                <br />
                <select style={{width: '100%', height: '30px'}} name="medicine_dosage_id" onClick={()=>handleMedicineDose()} onChange={handleChange} value={formValue.medicine_dosage_id}>
                  <option>Select</option>
                  {medicineDosage && medicineDosage.map((value=>(
                  <option key={value.id} value={value.id}>{value.dosage}</option>
                  )))}
                </select>
            </Col>
            <Col lg='12' sm='12'>
            <label className="mt-3">Remarks</label>
            <br />
                <textarea name="remark" onChange={handleChange} value={formValue.remark} style={{width: '100%'}}></textarea>
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
