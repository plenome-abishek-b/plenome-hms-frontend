import React,{useState,useEffect} from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"

export default function OpdMedicationDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [medCategory,setMedCategory] = useState('')
  const [medName,setMedName] = useState('')
  const [medDosage,setMedDosage] = useState('')

  useEffect(() => {
    handleMedCategory()
    handleMedName()
    handleMedDosage()

  }, [])

  const handleClickOpen = () => {
    //dialog open
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenDialog(false)
  }

  const handleMedCategory = async () =>{
    const response = await  api.getMedicineCategory()
    const {data} = response
    setMedCategory(data)
    console.log(data,"data")
  }

  const handleMedName = async () =>{
    const response = await  api.getMedicineName()
    const {data} = response
    setMedName(data)
    console.log(data,"data")
  }

  const handleMedDosage = async () =>{
    const response = await  api.getDosage()
    const {data} = response
    setMedDosage(data)
    console.log(data,"data")
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
        Add Medication Dose
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col lg='12' sm='12'>
                <label>Date</label>
                <br />
                <input placeholder="" style={{width: '100%', height: '30px'}} value={data.date} id="date" onChange={e=>onChange(e)}></input>
            </Col>
            <Col lg='12' sm='12'>
                <label>Time</label>
                <br />
                <input placeholder="" type="time" style={{width: '100%' , height: '30px'}} value={data.time} id="time" onChange={e=>onChange(e)}></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='12' sm='12'>
                <label>Medicine Category</label>
                <br />
                <select style={{width: '100%', height: '30px'}} id='medicine_category' onChange={e=>onChange(e)} value={data.medicine_category}>
                    <option>Select</option>
                    {medCategory && medCategory.map((medicine) => (
                    <option key={medicine.id} value={medicine.id}>
                      {medicine.medicine_category}
                    </option>
                  ))}
                </select>
            </Col>
            <Col lg='12' sm='12'>
                <label className="mt-3">Medicine Name</label>
                <br />
                <select style={{width: '100%', height: '30px'}} id='medicine_name' onChange={e=>onChange(e)} value={data.medicine_name}>
                    <option>Select</option>
                    {medName && medName.map((medicine) => (
                    <option key={medicine.id} value={medicine.id}>
                      {medicine.medicine_name}
                    </option>
                  ))}
                </select>
            </Col>
          </Row>
          <br />
          <Row>
          <Col lg='12' sm='12'>
                <label className="mt-3">Dosage</label>
                <br />
                <select style={{width: '100%', height: '30px'}} id='dosage' onChange={e=>onChange(e)} value={data.dosage}>
                    <option>Select</option>
                    {medDosage && medDosage.map((medicine) => (
                    <option key={medicine.id} value={medicine.id}>
                      {medicine.dosage}
                    </option>
                  ))}
                </select>
            </Col>
            <Col lg='12' sm='12'>
            <label className="mt-3">Remarks</label>
            <br />
                <textarea style={{width: '100%'}} id='remark' onChange={e=>onChange(e)} value={data.remark}></textarea>
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
