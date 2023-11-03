
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

export default function OpdTimelineDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openCrDialog, setOpenCrDialog] = React.useState(false)

  const handleClickOpen = () => {
    //dialog open
    setOpenCrDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
  }
  const [formValue,setFormValue] = useState({
    title:'',
    date:'',
    description:'',
    document:'',
    status:'approved',
    created_at:'2023-12-02 11:11:11',
    generated_users_type:''
  })
  const handleChange = (event) =>{
   const {name,value} = event.target
     setFormValue({...formValue,[name]:value})
  }
  console.log(formValue)
  const handleSubmit = async() =>{
 const response = await api.postOpdTimeline(formValue)

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
        <DialogTitle id="alert-dialog-title" className="text-white fw-bold" style={{backgroundColor: '#92A4FF', height: '60px'}}>
        Add Timeline
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <label>Title <span className="text-danger">*</span></label>
            <br />
            <input name="title" onChange={handleChange} value={formValue.title} placeholder="" style={{width: '100%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}}></input>
          </Row>
          <br />
          <Row>
            <label>Date <span className="text-danger">*</span></label>
            <br />
            <input name="date" onChange={handleChange} value={formValue.date} type="date" style={{width: '100%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}}></input>
          </Row>
          <br />
          <Row>
            <label>Description</label>
            <br />
            <textarea name="description" onChange={handleChange} value={formValue.description} style={{width: '100%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}}></textarea>
          </Row>
          <br />
          <Row >
          <label>Attach Document</label>
          <input onChange={handleChange} value={formValue.document} type="file"></input>
          </Row>
          <div className="mt-4">
          <label>visible to this person</label>
          <input type="checkbox" className="ms-2"></input>
          </div>
         
         
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