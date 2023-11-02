import React , {useState , useEffect} from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"

export default function SetupFloorDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openSetupFloorDialog, setOpenSetupFloorDialog] = React.useState(false)

  const handleClickOpen = () => {
    //dialog open
    setOpenSetupFloorDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenSetupFloorDialog(false)
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
        Add Floor
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
        <Container className="p-2">
            <Row>
                <label>Name<span style={{color: 'red'}}>*</span></label>
                <br />
                <input style={{height: '30px'}} value={data.name} id="name" onChange={e=>onChange(e)} ></input>
            </Row>
            <br />
            <Row>
                <label>Description</label>
                <br />
                <textarea style={{height: '50px'}} value={data.description} id="description" onChange={e=>onChange(e)} ></textarea>
            </Row>
        </Container>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-primary bg-soft btn-md" onClick={() => handleFormSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}