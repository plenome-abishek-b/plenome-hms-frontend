import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"

export default function Leavedialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openDialog, setOpenDialog] = React.useState(false)

  const handleClickOpen = () => {
    //dialog open
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenDialog(false)
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
        <DialogTitle id="alert-dialog-title">
          <h4>Add Leave</h4>
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container>
            <Row>
                <label>Apply Date</label>
                <br />
                <input type="date" style={{height: '30px', width: '100%'}}></input>
            </Row>
            <br />
            <Row>
                <label>Leave Type</label>
                <br />
                <select style={{height: '30px', width: '100%'}}>
                    <option>select</option>
                </select>
            </Row>
            <br />
            <Row>
                <label>Leave Date</label>
                <br />
                <input type="date" style={{height: '30px', width: '100%'}}></input>
            </Row>
            <br />
            <Row>
                <label>Reason</label>
                <br />
                <textarea style={{height: '80px', width: '100%'}}></textarea>
            </Row>
            <br />
            <Row>
                <label>Attach Document</label>
                <br />
                <input type="file" style={{height: '30px', width: '100%'}}></input>
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
