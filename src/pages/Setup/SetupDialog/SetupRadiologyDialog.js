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

export default function SetupPathologyDialog({
  open,
  handleClose,
  data,
  onChange,
  // handleFormSubmit,
}) {
  const [formData,setFormData] = useState({
    lab_name:'',
    created_at:'2012-11-12 11:11:11'
  })
  const handleChange = (event) =>{
    const {value,name} = event.target
    setFormData({
     ...formData, [name]:value
    })
  }
  console.log(formData,"gg")
  const handleFormSubmit = async () =>{
  const response = await api.postRadiologyCatetegory(formData)
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
        Add Radiology Category
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
        <Container className="p-2">
            <Row>
                <label>Category Name</label>
                <br />
                <input name="lab_name" onChange={handleChange} value={formData.lab_name}></input>
            </Row>
        </Container>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-primary bg-soft btn-sm" onClick={()=>handleFormSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
