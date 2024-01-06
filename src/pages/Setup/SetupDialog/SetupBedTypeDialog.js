import React , {useState , useEffect} from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"

export default function SetupBedTypeDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openSetupBedtypeDialog, setOpenSetupBedtypeDialog] = React.useState(false)

  const handleClickOpen = () => {
    //dialog open
    setOpenSetupBedtypeDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenSetupBedtypeDialog(false)
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
        Add Bed Type
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
            <Row className="p-2">
                <label>Name <span style={{color: 'red'}}>*</span></label>
                <br />
                <input style={{height: '30px'}} type="text" value={data.name} id="name" onChange={e=>onChange(e)} ></input>
            </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn-mod bg-soft btn-md" onClick={() => handleFormSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}