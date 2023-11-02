import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"

export default function SetupPurposeDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openPurposeDialog, setopenPurposeDialog] = React.useState(false)

  const handleClickOpen = () => {
    //dialog open
    setopenPurposeDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setopenPurposeDialog(false)
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
          Add purpose
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container>
            <Row>
                <label>Purpose</label>
                <br />
                <input id='visitors_purpose' onChange={e=>onChange(e)} value={data.visitors_purpose} ></input>
            </Row>
            <br />
            <Row>
                <label>Description</label>
                <br />
                <textarea id='description' onChange={e=>onChange(e)} value={data.description} ></textarea>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          <button
            className="btn btn-primary bg-soft btn-md"
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
