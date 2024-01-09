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

export default function SetupInventoryCategoryDialog({
  open,
  handleClose,
  handleChange,
  handleSubmit,
  formValue
}) {
  const [openSetupOperationDialog, setOpenSetupOperationDialog] = React.useState(false)
 
    
  const handleClickOpen = () => {
    //dialog open
    setOpenSetupOperationDialog(true)
  }
 

  const handleDialogClose = () => {
    //dialog close
    setOpenSetupOperationDialog(false)
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
        Add Inventory Category
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
            <Row className="p-2">
                <label>Item Category<span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="item_category" value={formValue.item_category} onChange={handleChange} style={{height: '30px',width:'100%'}}></input>
            </Row>
            <Row className="p-2">
                <label>Description<span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="description" value={formValue.description} onChange={handleChange} style={{height: '70px'}}></input>
            </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
