import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"
import { useState } from "react"

export default function SetupRadiologyUnitDialog({
  open,
  handleClose,
  data,
}) {
  const [openUnitTypeDialog, setOpenUnitTypeDialog] = React.useState(false)
  const [formData,setFormData] = useState({
   unit_name:'',
   unit_type:'radio',
   created_at:'2012-11-12 11:11:11'
  })
  const handleFormSubmit =async () =>{
  const response = await api.postRadiologyUnit(formData)
  }
  const handleChange = (e) =>{
    const {name,value} = e.target
    setFormData({
      ...formData,
      [name]:value
    })
  }
  

  const handleClickOpen = () => {
    //dialog open
    setOpenUnitTypeDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenUnitTypeDialog(false)
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
        <DialogTitle
          id="alert-dialog-title"
          className="bg-primary bg-soft text-primary"
        >
          Add Unit Type
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container>
            <Row>
                <label>Unit</label>
                <br />
                <input name="unit_name" onChange={handleChange} value={formData.unit_name} type="text" placeholder=""></input>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          <button
            className="btn-mod bg-soft btn-md"
            onClick={()=>handleFormSubmit(handleClose())}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
