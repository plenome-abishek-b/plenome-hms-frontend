import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Row, Col, Container, CardBody } from "reactstrap";
import { Card, TextField } from "@material-ui/core";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import PatientDialog from "pages/Appointment/Dialog/PatientDialog";

export default function PaymentDialog({ open, handleClose }) {
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
        <DialogTitle id="alert-dialog-title" style={{backgroundColor: '#7070FF'}}>
          <h4 className="text-white fw-bold">Add Payment Details</h4>
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container>
            <Row>
              <Col>
                <label>Amount(₹)</label>
                <br />
                <input
                  style={{
                    width: "100%",
                    height: "35px",
                    border: "1px solid rgba(0,0,0,0.2)",
                    borderRadius: "3px",
                  }}
                ></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <label>Patient Email</label>
                <br />
                <input
                  style={{
                    width: "100%",
                    height: "35px",
                    border: "1px solid rgba(0,0,0,0.2)",
                    borderRadius: "3px",
                  }}
                ></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <label>Patient Mobile Number</label>
                <br />
                <input
                  style={{
                    width: "100%",
                    height: "35px",
                    border: "1px solid rgba(0,0,0,0.2)",
                    borderRadius: "3px",
                  }}
                ></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <label>Transaction Type</label>
                <br />
                <select
                  style={{
                    width: "100%",
                    height: "35px",
                    border: "1px solid rgba(0,0,0,0.2)",
                    borderRadius: "3px",
                  }}
                >
                    <option>select</option>
                  <option value="Direct">Direct</option>
                  <option value="Indirect">Indirect</option>
                </select>
              </Col>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          <button
            className="btn-mod bg-soft btn-md"
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
