import React, { useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Label, Input } from "reactstrap"
import { TextField } from "@mui/material"
import TextArea from "antd/es/input/TextArea"
import { useFormik } from "formik"
import api from "services/Api"

export default function PaymentDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className='text-white fw-bold' style={{backgroundColor: '#92A4FF'}}>Add Payment Details</DialogTitle>
        <DialogContent>
         
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    </div>
  )
}
