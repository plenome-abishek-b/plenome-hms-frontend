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
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "30%",
              maxWidth: "1200px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{backgroundColor: '#6070FF'}}>
          <h4 className="text-white fw-bold">Add Payment Details</h4>
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container lg='12' md='12' sm='12'>
            <Row>
              <Col lg="12" md='12' sm="12">
                <label>Amount(₹)</label>
                <br />
                <input
                  style={{
                    width: "100%",
                    height: "40px",
                   border: "1px solid #8F98B3",
                    borderRadius: "8px",
                  }}
                ></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="12" md='12' sm="12">
                <label>Patient Email</label>
                <br />
                <input
                  style={{
                    width: "100%",
                    height: "40px",
                   border: "1px solid #8F98B3",
                    borderRadius: "8px",
                  }}
                ></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="12" md='12' sm="12">
                <label>Patient Mobile Number</label>
                <br />
                <input
                  style={{
                    width: "100%",
                    height: "40px",
                   border: "1px solid #8F98B3",
                    borderRadius: "8px",
                  }}
                ></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="12" md='12' sm="12">
                <label>Transaction Type</label>
                <br />
                <select
                  style={{
                    width: "100%",
                    height: "40px",
                   border: "1px solid #8F98B3",
                    borderRadius: "8px",
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
