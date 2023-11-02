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

export default function SetupLeavetypeDialog({
  open,
  handleClose,
  getLeavetype
}) {
  const [openSetupBbDialog, setOpenSetupBbDialog] = React.useState(false)
  const [formData,setFormdata] = useState({
   type:'',
   created_at:'2023-02-12 11:11:11',
   is_active:'yes'
  })
  const handleClickOpen = () => {
    //dialog open
    setOpenSetupBbDialog(true)
  }

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
   const response = await api.postHrsetup_LeaveType(formData)
   getLeavetype()
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
        <Label>Name</Label>
            <input
            type='text'
            name="type"
            onChange={handleChange}
            value={formData.type}
            style={{height: '30px'}}
            >

            </input>
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
