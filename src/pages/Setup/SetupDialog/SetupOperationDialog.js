import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"

export default function SetupOperationsDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openSetupOperationsDialog, setOpenSetupOperationsDialog] = React.useState(false)

  const handleClickOpen = () => {
    //dialog open
    setOpenSetupOperationsDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenSetupOperationsDialog(false)
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
        Add Operation
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
          <Container>
            <Row>
                <label>Operation Name</label>
                <br />
                <input style={{height: '30px'}}></input>
            </Row>
            <br />
            <Row>
                <label>Category</label>
                <br />
                <select style={{height:'30px'}}>
                <option>select</option>
                    <option>ENT and Oral Surgery</option>
                    <option>Gynaecology</option>
                    <option>Ophthalmology</option>
                    <option>Orthopedic Surgery</option>
                    <option>Plastic Surgery</option>
                    <option>Thoracic Surgery</option>
                    <option>Urology</option>
                </select>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-primary bg-soft btn-md" onClick={handleClose} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
