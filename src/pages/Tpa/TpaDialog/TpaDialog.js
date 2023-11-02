import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"

export default function TpaDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openTpaDialog, setOpenTpaDialog] = React.useState(false)

  const handleClickOpen = () => {
    //dialog open
    setOpenTpaDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenTpaDialog(false)
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
          Add TPA
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row className="p-2">
            <label>Name</label>
            <br />
            <input type="text" placeholder="" id="organisation_name" value={data.organisation_name} onChange={e=>onChange(e)} ></input>
          </Row>
          
          <Row className="p-2">
            <label>Code</label>
            <br />
            <input type="text" placeholder="" id="code" value={data.code} onChange={e=>onChange(e)} ></input>
          </Row>
         
          <Row className="p-2">
            <label>Contact No</label>
            <br />
            <input type="text" placeholder="" id="contact_no" value={data.contact_no} onChange={e=>onChange(e)} ></input>
          </Row>
         
          <Row className="p-2">
            <label>Address</label>
            <br />
            <input type="text" placeholder="" id="address" value={data.address} onChange={e=>onChange(e)} ></input>
          </Row>
          
          <Row className="p-2">
            <label>Contact Person Name</label>
            <br />
            <input type="text" placeholder="" id="contact_person_name" value={data.contact_person_name} onChange={e=>onChange(e)} ></input>
          </Row>
         
          <Row className="p-2">
            <label>Contact Person Phone</label>
            <br />
            <input type="text" placeholder="" id="contact_person_phone" value={data.contact_person_phone} onChange={e=>onChange(e)} ></input>
          </Row>
        </DialogContent>
        <DialogActions>
          <button
            className="btn btn-primary bg-soft btn-md"
            onClick={() => handleFormSubmit()}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
