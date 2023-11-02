import React, { useState, useEffect } from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"

export default function SetupChargeTypeDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
})


{
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
          Add Charge Type
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container>
            <Row>
              <label>Charge Type</label>
              <br />
              <input style={{ width: "100%", height: "30px" }} id="charge_type" value={data.charge_type} onChange={e=>onChange(e)}></input>
            </Row>
            <br />
            <br />
            <Row>
              <label>Module</label>
            </Row>
            <Row>
              <Col>
                <div className="d-flex align-items-center">
                  <input type="checkbox" className="me-2" />
                  <p className="mt-3 fw-bold">Appointment</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="d-flex align-items-center">
                  <input type="checkbox" className="me-2" />
                  <p className="mt-3 fw-bold">OPD</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="d-flex align-items-center">
                  <input type="checkbox" className="me-2" />
                  <p className="mt-3 fw-bold">IPD</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="d-flex align-items-center">
                  <input type="checkbox" className="me-2" />
                  <p className="mt-3 fw-bold">Pathology</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="d-flex align-items-center">
                  <input type="checkbox" className="me-2" />
                  <p className="mt-3 fw-bold">Radiology</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="d-flex align-items-center">
                  <input type="checkbox" className="me-2" />
                  <p className="mt-3 fw-bold">Blood Bank</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="d-flex align-items-center">
                  <input type="checkbox" className="me-2" />
                  <p className="mt-3 fw-bold">Ambulance</p>
                </div>
              </Col>
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
