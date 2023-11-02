import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"

export default function FormDialog({
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
            <Col lg="8">
              <Row>
                <Col>
                  <label>Height</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    style={{ height: "30px" }}
                  ></input>
                </Col>
                <Col>
                  <label>Weight</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    style={{ height: "30px" }}
                  ></input>
                </Col>
                <Col>
                  <label>BP</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    style={{ height: "30px" }}
                  ></input>
                </Col>
                <Col>
                  <label>Pulse</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    style={{ height: "30px" }}
                  ></input>
                </Col>
                <Col>
                  <label>Temperature</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    style={{ height: "30px" }}
                  ></input>
                </Col>
                <Col>
                  <label>Respiration</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    style={{ height: "30px" }}
                  ></input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Row>
                    <Col lg="4" md="4" sm="3">
                      <label>Symptoms Type</label>
                      <br />
                      <input
                        type="text"
                        placeholder=""
                        style={{ width: "100%", height: "30px" }}
                      ></input>
                    </Col>
                    <Col lg="4" md="4" sm="3">
                      <label>Symptoms Title</label>
                      <br />
                      <input
                        type="text"
                        placeholder=""
                        style={{ width: "100%", height: "30px" }}
                      ></input>
                    </Col>
                    <Col lg="4" md="4" sm="3">
                      <label>Symptoms Description</label>
                      <br />
                      <input
                        type="text"
                        placeholder=""
                        style={{ width: "100%", height: "30px" }}
                      ></input>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="12" md="12" sm="2">
                  <label>Note</label>
                  <br />
                  <textarea
                    maxLength="infinity"
                    style={{ width: "100%" }}
                  ></textarea>
                </Col>
              </Row>
            </Col>
            <Col lg="4">
              <div
                className="card p-4"
                style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
              >
                <Row>
                  <Col lg="12">
                    <label>Admission Date</label>
                    <br />
                    <input placeholder="" style={{ width: "100%" }}></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Case</label>
                    <br />
                    <input placeholder="" style={{ width: "100%" }}></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Casualty</label>
                    <br />
                    <select style={{ width: "100%", height: "30px" }}>
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </Col>
                  <Col>
                    <label>Old Patient</label>
                    <br />
                    <select style={{ width: "100%", height: "30px" }}>
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>TPA</label>
                    <br />
                    <select style={{ width: "100%", height: "30px" }}>
                      <option>select</option>
                    </select>
                  </Col>
                  <Col>
                    <label>Credit Limit</label>
                    <br />
                    <input
                      placeholder=""
                      style={{ width: "100%", height: "30px" }}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Bed Group</label>
                    <br />
                    <select style={{ width: "100%" , height: "30px"}}>
                      <option>Select</option>
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Bed Number</label>
                    <br />
                    <select style={{ width: "100%", height: "30px" }}>
                      <option>Select</option>
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Live Consultation</label>
                    <br />
                    <select style={{ width: "100%" , height: "30px"}}>
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </Col>
                </Row>
              </div>
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
