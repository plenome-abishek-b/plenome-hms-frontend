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

export default function BloodComponentDialog({
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
              className="btn btn-primary"
              style={{ marginRight: "48px", position: 'fixed', top: '50px', left: '810px' }}
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
              <Col lg="3" md="3" sm="12">
                <label>Issue Date</label>
                <br />
                <input style={{ width: "100%", height: "25px" }}></input>
              </Col>
              <Col lg="3" md="3" sm="12">
                <label>Hospital Doctor</label>
                <br />
                <select style={{ width: "100%", height: "25px" }}>
                  <option>select</option>
                </select>
              </Col>
              <Col lg="3" md="3" sm="12">
                <label>Reference Name</label>
                <br />
                <input
                  placeholder=""
                  style={{ width: "100%", height: "25px" }}
                ></input>
              </Col>
              <Col lg="3" md="3" sm="12">
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
              <Col lg="4" md="4" sm="12" >
              <label>Components</label>
              <br />
              <select style={{ width: "100%", height: "25px" }}>
                <option>select</option>
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
              <br />
                <label>Charge Category</label>
                <br />
                <select style={{ width: "100%", height: "25px" }}>
                  <option>select</option>
                </select>
              </Col>
              
            </Row>
            <br />
            <Row>
            <Col lg="6" md="6" sm="12" >
              <br />
                <label>Charge Name</label>
                <br />
                <select style={{ width: "100%", height: "25px" }}>
                  <option>select</option>
                </select>
              </Col>
              <Col lg="6" md="6" sm="12" >
              <br />
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
              </Col>
              <Col lg="6" md="6" sm="12">
                <Row>
                  <label>Total</label>
                  <br />
                  <input
                    style={{
                      border: "none",
                      borderBottom: "1px solid black",
                      width: "50%",
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
                      width: "50%",
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
                      width: "50%",
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
                      width: "50%",
                      textAlign: "end",
                    }}
                  ></input>
                </Row>
                <br />
                <Row>
                    <label>Payment Mode</label>
                    <br />
                    <select style={{height: '25px'}}>
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
            className="btn btn-primary"
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
