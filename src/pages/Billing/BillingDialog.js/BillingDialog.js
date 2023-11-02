import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"

export default function BillingDialog({
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
          <Container className="bg-primary bg-soft p-3" fluid>
            <input
              placeholder="Search"
              style={{ height: "35px", fontSize: "18px" }}
            ></input>
            <button
              className="btn btn-primary bg-soft ms-3"
              onClick={handleClickOpen}
            >
              + New Patient
            </button>
            <PatientDialog open={openDialog} handleClose={handleDialogClose} from='ipd' />
          </Container>
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col lg='6' md='6' sm='12'>
                <label>Appointment Date</label>
                <br />
                <input type="datetime-local" style={{width: '100%' , height: '30px'}}></input>
            </Col>
            <Col lg='6' md='6' sm='12'>
                <label>Case</label>
                <br />
                <input style={{width: '100%' , height: '30px'}}></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' md='6' sm='12'>
                <label>Casualty</label>
                <br />
                <select style={{width: '100%' , height: '30px'}}>
                    <option>select</option>
                    <option>Yes</option>
                    <option>No</option>
                </select>
            </Col>
            <Col lg='6' md='6' sm='12'>
                <label>Old Patient</label>
                <br />
                <select style={{width: '100%' , height: '30px'}}>
                    <option>select</option>
                    <option>Yes</option>
                    <option>No</option>
                </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' md='6' sm='12'>
                <label>TPA</label>
                <br />
                <select style={{width: '100%' , height: '30px'}}>
                    <option>select</option>
                    <option></option>
                </select>
            </Col>
            <Col lg='6' md='6' sm='12'>
                <label>Reference</label>
                <br />
                <input style={{width: '100%' , height: '30px'}}></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' md='6' sm='12'>
                <label>Consultant Doctor</label>
                <br />
                <select style={{width: '100%' , height: '30px'}}>
                    <option>select</option>
                </select>
            </Col>
            <Col lg='6' md='6' sm='12'>
                <label>Charge Category</label>
                <br />
                <select style={{width: '100%' , height: '30px'}}>
                    <option>select</option>
                </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' md='6' sm='12'>
                <label>Charge</label>
                <br />
                <select style={{width: '100%' , height: '30px'}}>
                    <option>select</option>
                </select>
            </Col>
            <Col lg='6' md='6' sm='12'>
                <label>Tax</label>
                <br />
                <input placeholder="%" style={{width: '100%' , height: '30px'}}></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' md='6' sm='12'>
                <label>Standard Charge</label>
                <br />
                <input style={{width: '100%' , height: '30px'}}></input>
            </Col>
            <Col lg='6' md='6' sm='12'>
                <label>Applied Charge</label>
                <br />
                <input style={{width: '100%' , height: '30px'}}></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' md='6' sm='12'>
                <label>Amount</label>
                <br />
                <input style={{width: '100%' , height: '30px'}}></input>
            </Col>
            <Col lg='6' md='6' sm='12'>
                <label>Payment Mode</label>
                <br />
                <select style={{width: '100%' , height: '30px'}}>
                    <option>select</option>
                    <option>Cash</option>
                    <option>UPI</option>
                </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' md='6' sm='12'>
                <label>Paid Amount</label>
                <br />
                <input style={{width: '100%' , height: '30px'}}></input>
            </Col>
            <Col lg='6' md='6' sm='12'>
                <label>Live Consultation</label>
                <br />
                <select style={{width: '100%' , height: '30px'}}>
                    <option>select</option>
                </select>
            </Col>
          </Row>
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
