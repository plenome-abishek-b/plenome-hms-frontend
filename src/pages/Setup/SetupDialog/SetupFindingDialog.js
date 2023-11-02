import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"

export default function SetupFindingDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openFindingDialog, setOpenFindingDialog] = React.useState(false)

  const handleClickOpen = () => {
    //dialog open
    setOpenFindingDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenFindingDialog(false)
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
          Add Finding
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container className="p-2">
            <Row>
                <label>Finding<span style={{color: 'red'}}>*</span></label>
                <br />
                <input type="text" style={{height: '30px'}}></input>
            </Row>
            <br />
            <Row>
                <label>Category</label>
                <br />
                <select style={{height: '30px'}}>
                    <option>select</option>
                    <option>Fever</option>
                    <option>Typhoid</option>
                    <option>Skin Problem</option>
                    <option>Bone Density Problem</option>
                    <option>Hair Problems</option>
                    <option>Eye Diseases</option>
                    <option>Nose Diseases</option>
                </select>
            </Row>
            <br />
            <Row>
                <label>Description</label>
                <br />
                <textarea style={{height: '50px'}}></textarea>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          <button
            className="btn btn-primary bg-soft btn-md"
            onClick={handleClose}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
