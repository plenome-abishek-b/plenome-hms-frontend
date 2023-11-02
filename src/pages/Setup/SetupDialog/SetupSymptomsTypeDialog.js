import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"

export default function SetupSymptomsTypeDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openSetupSupplierDialog, setOpenSetupSupplierDialog] = React.useState(false)

  const handleClickOpen = () => {
    //dialog open
    setOpenSetupSupplierDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
   setOpenSetupSupplierDialog(false)
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
        Add Symptoms Type
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
        <Container className="p-2">
            <Row>
                <label>Symptoms Type</label>
                <br />
                <input value={data.symptoms_type} id="symptoms_type" onChange={e=>onChange(e)}  ></input>
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