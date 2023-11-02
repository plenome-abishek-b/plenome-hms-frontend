import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"

export default function SetupBloodBankDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openSetupBbDialog, setOpenSetupBbDialog] = React.useState(false)

  const handleClickOpen = () => {
    //dialog open
    setOpenSetupBbDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
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
        Add Products
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
        <Row className="p-2">
        <Label>Type</Label>
            <select style={{height: '30px'}} id="is_blood_group" onChange={e=>onChange(e)}>
                <option>select</option>
                <option value="1">Blood Group</option>
                <option value="0">component</option>
            </select>
        </Row>
        <br />
        <Row className="p-2">
        <Label>Name</Label>
            <input
            type="text"
            style={{height: '30px'}}
            id="name"
            onChange={e=>onChange(e)}
            >

            </input>
        </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-primary bg-soft btn-md" onClick={handleFormSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
