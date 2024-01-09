import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { TextField } from "@mui/material"
import { Input, Select } from "@material-ui/core"
import { Row, Col } from "reactstrap"
import { useEffect } from "react"
import api from "services/Api"
import { useState } from "react"
import jsPDF from 'jspdf';


export default function CarecontextDialog({ open, handleClose, data, handleBill }) {
    

  const handleClickOpen = () => {
    //dialog open
    setOpenpatientDialog(true)
  }
  const handleDialogClose = () => {
    //dialog close
    setOpenpatientDialog(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"

      >
        <DialogTitle id="alert-dialog-title" className="text-white fw-bold" style={{ backgroundColor: '#6070FF' }}>
          <h4>Link Care-context</h4>
        </DialogTitle>
        <DialogContent className="mt-4">
         
        </DialogContent>
        <DialogActions
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <button onClick={handleClose} className="btn fw-bold text-white" style={{ backgroundColor: '#B2533E' }}>
            Cancel
          </button>
          <button
            className="btn-mod bg-soft fw-bold"
          >
            Submit
          </button>



        </DialogActions>
      </Dialog>
    </div>
  )
}
