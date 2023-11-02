import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"
import { useState } from "react"

export default function SetupInventoryStoreDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openSetupOperationDialog, setOpenSetupOperationDialog] = React.useState(false)
  const [formValue,setFormValue] = useState({
    item_store:'',
    code:'',
    description:'',
    created_at:'2021-12-11 11:11:11'
  })
  const handleClickOpen = () => {
    //dialog open
    setOpenSetupOperationDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenSetupOperationDialog(false)
  }
  const handleChange =  (e) =>{
    const {value,name} = e.target
    setFormValue({
        ...formValue,
        [name]:value
    })
  }
  const handleSubmit = async () =>{
   const response = await api.postInvestmentStore_setup(formValue)
   const {data} = response
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
        Add Item Story
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
            <Row className="p-2">
                <label>Item Store Name<span style={{color: 'red'}}>*</span></label>
                <br />
                <input onChange={handleChange} name="item_store" value={formValue.item_store} style={{height: '30px',width:'100%'}}></input>
            </Row>
            <Row className="p-2">
                <label>Item Store Code<span style={{color: 'red'}}>*</span></label>
                <br />
                <input onChange={handleChange} name="code" value={formValue.code} style={{height: '30px',width:'100%'}}></input>
            </Row>
            <Row className="p-2">
                <label>description <span style={{color: 'red'}}>*</span></label>
                <br />
                <input onChange={handleChange} name="description" value={formValue.description}  style={{height: '70px'}}></input>
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
