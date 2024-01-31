import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { useEffect } from "react"
import { useState } from "react"
import api from "services/Api"

export default function SetupSymptomsTypeDialog({
  open,
  handleClose,
  getSymptomsTypeList,
  selectedData
}) {
  const [openSetupSupplierDialog, setOpenSetupSupplierDialog] = React.useState(false)
  const initialSymptomTypeValue = {
    symptoms_type: "",
    Hospital_id:1
   }
   const [formData,setFormData] = useState(initialSymptomTypeValue)

  const handleClickOpen = () => {
    //dialog open
    setOpenSetupSupplierDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
   setOpenSetupSupplierDialog(false)
  }
  const handlechange = (e) =>{
    const {id,value} = e.target
    console.log(id,value,"both getting");
    setFormData({...formData,[id]:value})
  }
  useEffect(()=>{
   if(selectedData){
    setFormData({
      symptoms_type:selectedData?.symptoms_type,
      Hospital_id:1
    })
   }else{
    setFormData({
      symptoms_type:'',
      Hospital_id:1
    })
   }
  },[selectedData])
  const handleFormSubmit = async () =>{
   const response = await api.postSetupSymptoms_Type(formData)
   getSymptomsTypeList()
   handleClose()
  }
  const handleUpdate = async () =>{
    const newData = {
      ...formData,
      id:selectedData?.id
    }
    const response = await api?.updateSetupSymptoms_Type(newData)
    getSymptomsTypeList()
    handleClose()
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
        Add Symptoms Type
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
        <Container className="p-2">
            <Row>
                <label>Symptoms Type</label>
                <br />
                <input value={formData?.symptoms_type} id="symptoms_type" onChange={handlechange}  ></input>
            </Row>
        </Container>
        </DialogContent>
        <DialogActions>
          {selectedData?.symptoms_type ? 
          <button className="btn-mod bg-soft btn-md" onClick={() => handleUpdate()} style={{marginRight: '3%'}}>
            Save
          </button> :
          <button className="btn-mod bg-soft btn-md" onClick={() => handleFormSubmit()} style={{marginRight: '3%'}}>
          Save
        </button> 
           }
        </DialogActions>
      </Dialog>
    </div>
  )
}