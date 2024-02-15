import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { useState } from "react"
import api from "services/Api"
import { useEffect } from "react"

export default function SetupLeavetypeDialog({
  open,
  handleClose,
  selectedData,
  getLeavetype
}) {
  const [openSetupBbDialog, setOpenSetupBbDialog] = React.useState(false)
  const [formData,setFormdata] = useState({
   type:'',
   Hospital_id:1,
   is_active:'yes'
  })
  const [validate,setValidate] = useState(false)
  const handleClickOpen = () => {
    //dialog open
    setOpenSetupBbDialog(true)
  }
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      setFormdata({
        type: selectedData?.type || "",
        Hospital_id:1,
        is_active:"yes"
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormdata({
        type:'',
        Hospital_id:1,
        is_active:"yes"
      });
    }
  }, [selectedData]);

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
  }
  
  const handleChange = (e) =>{
    const {name,value} = e.target
    setFormdata({
      ...formData,
      [name]:value
    })
  }
  const handleSubmit =async () =>{
    if(formData?.type === ''){
      setValidate(true)
      setTimeout(()=>{
       setValidate(false)
      },10000)
     }else{
   const response = await api.postSetupHR_leaveType(formData)
   getLeavetype()
   handleClose()
     }
  }
  const handUpdateSubmit =async ()=>{
    if(formData?.type === ''){
     setValidate(true)
     setTimeout(()=>{
      setValidate(false)
     },10000)
    }else{
      const newData ={
        ...formData,
        id:selectedData?.id
      }
      const response = await api.updateSetupHR_leaveType(newData)
      getLeavetype()
      handleClose()
    }
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
       Add Leave Type
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
       
        <br />
        <Row className="p-2">
        <Label>Name<span className="text-danger">*</span></Label>
            <input
            type='text'
            name="type"
            placeholder={validate?"enter name":""}
            onChange={handleChange}
            value={formData.type}
            style={{height: '30px',borderColor:validate ? 'red':'inherit', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px'}}
            >

            </input>
            </Row>
        </DialogContent>
        <DialogActions>
          {selectedData?.type ? <button className="btn-mod bg-soft btn-md" onClick={()=>handUpdateSubmit()} style={{marginRight: '3%'}}>
            Update
          </button> :
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleSubmit()} style={{marginRight: '3%'}}>
          Save
        </button>
          }
        </DialogActions>
      </Dialog>
    </div>
  )
}
