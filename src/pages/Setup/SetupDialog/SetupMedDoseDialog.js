import React, { useState } from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"

export default function SetupMedDoseDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openMedDoseDialog, setOpenMedDoseDialog] = React.useState(false)
  const [unit, setUnit] = useState("")

  const handleClickOpen = () => {
    //dialog open
    setOpenMedDoseDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenMedDoseDialog(false)
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
          Add Medicine Dose
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container className="p-2">
            <Row>
              <label>Medicine Category</label>
              <br />
              <select
                style={{ height: "30px" }}
                id="medicine_category"
                value={data.medicine_category}
                onChange={e => onChange(e)}
              >
                <option>select</option>
                <option value="Syrup">Syrup</option>
                <option value="Capsule">Capsule</option>
                <option value="Injection">Injection</option>
                <option value="Ointment">Ointment</option>
                <option value="Cream">Cream</option>
                <option value="Drops">Drops</option>
                <option value="Inhalers">Inhalers</option>
              </select>
            </Row>
            <br />
            <Row>
              <Col>
                <label>Dose</label>
                <br />
                <input
                  style={{ width: "100%", height: "30px" }}
                  id="dosage"
                  value={data.dosage}
                  onChange={e => onChange(e)}
                  type="number"
                ></input>
              </Col>
              <Col>
                <label>Unit</label>
                <br />
                <select
                  style={{ width: "100%", height: "30px" }}
                  id="unit"
                  value={unit}
                  onChange={e => {
                    setUnit(e.target.value)
                    onChange(e)
                  }}
                  type='number'
                >
                  <option value="">Select</option>
                  <option value="ML">ML</option>
                  <option value="Litre">Litre</option>
                  <option value="Day">Day</option>
                  <option value="Hour">Hour</option>
                  <option value="MG">MG</option>
                </select>
              </Col>
            </Row>
            <br />
            <div>
              <button className="btn btn-primary bg-soft">
                <i className="fa fa-plus"></i>&nbsp;Add
              </button>
            </div>
          </Container>
        </DialogContent>
        <DialogActions>
          <button
            className="btn btn-primary bg-soft btn-md"
            onClick={() => handleFormSubmit(handleClose())}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
