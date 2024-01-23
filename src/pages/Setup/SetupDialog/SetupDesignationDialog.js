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

export default function SetupDesignationDialog({
  open,
  handleClose,
  getDesignation,
  selectedData
}) {
  const [openSetupBbDialog, setOpenSetupBbDialog] = React.useState(false)
  const [formData,setFormdata] = useState({
    designation:'',
    is_active:'yes',
    // created_at:'2023-02-12 11:11:11'
    Hospital_id:1
  })
  const [validate,setValidate] = useState(false)
  const handleClickOpen = () => {
    //dialog open
    setOpenSetupBbDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
  }
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      setFormdata({
        designation: selectedData?.designation || "",
        is_active:"yes",
        Hospital_id:1,
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormdata({
        designation:'',
        Hospital_id:1,
        is_active:"yes"
      });
    }
  }, [selectedData]);
  const handleChange = (e) =>{
    const {name,value} = e.target
    setFormdata({
      ...formData,
      [name]:value
    })
  }
  const handleSubmit =async () =>{
    if(formData?.designation === ''){
      setValidate(true)
      setTimeout(()=>{
      setValidate(false)
      },10000)
    }else{
      const response = await api.postSetupHR_designation(formData)
      getDesignation()
      handleClose()
    }
  }
  const handleUpdate = async () =>{
    const newData = {
      ...formData,
      id:selectedData?.id
    }
    if(newData?.designation === ''){
      setValidate(true)
      setTimeout(()=>{
      setValidate(false)
      },10000)
    }else{
      const response = await api.updateSetupHR_designation(newData)
      getDesignation()
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
       Add Designation
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
       
        <br />
        <Row className="p-2">
        <Label>Name</Label>
            <input
            name="designation"
            placeholder={validate ? "enter designation":""}
            onChange={handleChange}
            value={formData.designation}
            type="text"
            style={{height: '30px',borderColor:validate ? 'red':'inherit'}}
            >

            </input>
            </Row>
        </DialogContent>
        <DialogActions>
          {
            selectedData?.designation ?
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleUpdate()} style={{marginRight: '3%'}}>
            Save
          </button>:
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleSubmit()} style={{marginRight: '3%'}}>
          Save
        </button>
          }
        </DialogActions>
      </Dialog>
    </div>
  )
}
