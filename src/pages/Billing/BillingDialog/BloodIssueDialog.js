import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import api from "services/Api"

export default function BloodIssueDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
  patientId,
}) {
  var [date, setDate] = useState(new Date())

  // console.log(searchByPrescription, "prescription");
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="bg-primary bg-soft text-primary"
        >
          <div>
            {" "}
            <select style={{ width: "40%", height: "40px" }}>
              <option>select</option>
            </select>
          </div>
          <div className="mt-1 d-flex justify-content-end">
            <button
              className="btn-mod"
              style={{
                marginRight: "48px",
                position: "fixed",
                top: "50px",
                left: "810px",
              }}
            >
              <i className="fa fa-plus"></i>&nbsp;Add Patient
            </button>
            {/* <PatientPathologyDialog
              open={openDialog}
              handleClose={handleCloseDialog} /> */}
          </div>
        </DialogTitle>
        <DialogContent className="mt-2">
          <br />
          <Container>
            <Row>
              <Col lg="6" md="6" sm="12">
                <label>Issue Date</label>
                <br />
                <input style={{ width: "100%", height: "25px" }}></input>
              </Col>
              <Col lg="6" md="6" sm="12">
                <label>Hospital Doctor</label>
                <br />
                <select style={{ width: "100%", height: "25px" }}>
                  <option>select</option>
                </select>
              </Col>
            </Row>
            <br />
            <Row>
            <Col lg="6" md="6" sm="12">
                <label>Reference Name</label>
                <br />
                <input
                  placeholder=""
                  style={{ width: "100%", height: "25px" }}
                ></input>
              </Col>
              <Col lg="6" md="6" sm="12">
                <label>Technician</label>
                <br />
                <input style={{ width: "100%", height: "25px" }}></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="4" md="4" sm="12">
                <label>Blood Group</label>
                <br />
                <select style={{ width: "100%", height: "25px" }}>
                  <option></option>
                </select>
              </Col>
              <Col lg="4" md="4" sm="12">
                <label>Bag</label>
                <br />
                <select style={{ width: "100%", height: "25px" }}>
                  <option></option>
                </select>
              </Col>
              <Col lg="4" md="4" sm="12">
                <label>Charge Category</label>
                <br />
                <select style={{ width: "100%", height: "25px" }}>
                  <option>select</option>
                </select>
              </Col>
              <Col lg="4" md="4" sm="12">
                <br />
                <label>Charge Name</label>
                <br />
                <select style={{ width: "100%", height: "25px" }}>
                  <option>select</option>
                </select>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="12">
                <label>Standard Charge</label>
                <br />
                <input style={{ width: "100%", height: "25px" }}></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="6" md="6" sm="12">
                <label>Note</label>
                <br />
                <textarea style={{ width: "100%", height: "55px" }}></textarea>
                <br />
                <label>Blood Qty</label>
                <br />
                <input style={{ width: "100%", height: "25px" }}></input>
              </Col>
              <Col lg="6" md="6" sm="12">
                <Row>
                  <label>Total</label>
                  <br />
                  <input
                    style={{
                      border: "none",
                      borderBottom: "1px solid black",
                      width: "100%",
                      textAlign: "end",
                    }}
                  ></input>
                </Row>
                <br />
                <Row>
                  <label>Discount</label>
                  <br />
                  <input
                    style={{
                      border: "none",
                      borderBottom: "1px solid black",
                      width: "100%",
                      textAlign: "end",
                    }}
                  ></input>
                </Row>
                <br />
                <Row>
                  <label>Tax</label>
                  <br />
                  <input
                    style={{
                      border: "none",
                      borderBottom: "1px solid black",
                      width: "100%",
                      textAlign: "end",
                    }}
                  ></input>
                </Row>
                <br />
                <Row>
                  <label>Net Amount</label>
                  <br />
                  <input
                    style={{
                      border: "none",
                      borderBottom: "1px solid black",
                      width: "100%",
                      textAlign: "end",
                    }}
                  ></input>
                </Row>
                <br />
                <Row>
                  <label>Payment Mode</label>
                  <br />
                  <select>
                    <option>select</option>
                    <option>Cash</option>
                    <option>Cheque</option>
                    <option>UPI</option>
                  </select>
                </Row>
                <br />
                <Row>
                  <label>Payment Amount</label>
                  <br />
                  <input></input>
                </Row>
              </Col>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          <button
            className="btn-mod"
            onClick={() => handleFormSubmit(handleClose())}
            autoFocus
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
