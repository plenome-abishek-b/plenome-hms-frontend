import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { Input, Select } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import { useEffect } from "react";
import api from "services/Api";
import { useState } from "react";
import jsPDF from "jspdf";

export default function ConsentDialog({ open, handleClose, data, handleBill }) {
  const handleClickOpen = () => {
    //dialog open
    setOpenpatientDialog(true);
  };
  const handleDialogClose = () => {
    //dialog close
    setOpenpatientDialog(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-white fw-bold"
          style={{ backgroundColor: "#6070FF" }}
        >
          <h4 className="fw-bold">Consent Request Form</h4>
        </DialogTitle>
        <DialogContent className="mt-4">
          <Row>
            <Col>
              <label>Health info from</label>
              <br />
              <input
                type="date"
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              ></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Health info to</label>
              <br />
              <input
                type="date"
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              ></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Health info type</label>
            </Col>
          </Row>
          <Row>
            <Col lg='1'>
              <div>
                <input
                  type="checkbox"
                  style={{
                    height: "30px",
                    border: "1px solid grey",
                    borderRadius: "5px",
                  }}
                ></input>
               
              </div>
            </Col>
            <Col lg='4'>
            <label className="mt-2">OP Consultation</label>
            </Col>
            <Col lg='1'>
              <div>
                <input
                  type="checkbox"
                  style={{
                    height: "30px",
                    border: "1px solid grey",
                    borderRadius: "5px",
                  }}
                ></input>
               
              </div>
            </Col>
            <Col lg='4'>
            <label className="mt-2">Diagnostic Reports</label>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='1'>
              <div>
                <input
                  type="checkbox"
                  style={{
                    height: "30px",
                    border: "1px solid grey",
                    borderRadius: "5px",
                  }}
                ></input>
               
              </div>
            </Col>
            <Col lg='4'>
            <label className="mt-2">Discharge Summary</label>
            </Col>
            <Col lg='1'>
              <div>
                <input
                  type="checkbox"
                  style={{
                    height: "30px",
                    border: "1px solid grey",
                    borderRadius: "5px",
                  }}
                ></input>
               
              </div>
            </Col>
            <Col lg='4'>
            <label className="mt-2">Prescription</label>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='1'>
              <div>
                <input
                  type="checkbox"
                  style={{
                    height: "30px",
                    border: "1px solid grey",
                    borderRadius: "5px",
                  }}
                ></input>
               
              </div>
            </Col>
            <Col lg='4'>
            <label className="mt-2">Immunization Record</label>
            </Col>
            <Col lg='1'>
              <div>
                <input
                  type="checkbox"
                  style={{
                    height: "30px",
                    border: "1px solid grey",
                    borderRadius: "5px",
                  }}
                ></input>
               
              </div>
            </Col>
            <Col lg='4'>
            <label className="mt-2">Health document Record</label>
            </Col>
          </Row>
          <br />
          <Row>
          <Col lg='1'>
              <div>
                <input
                  type="checkbox"
                  style={{
                    height: "30px",
                    border: "1px solid grey",
                    borderRadius: "5px",
                  }}
                ></input>
               
              </div>
            </Col>
            <Col lg='4'>
            <label className="mt-2">Wellness Record</label>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Consent Expiry</label>
              <br />
              <input type="date" style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}></input>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <button
            onClick={handleClose}
            className="btn fw-bold text-white"
            style={{ backgroundColor: "#B2533E" }}
          >
            Cancel
          </button>
          <button className="btn-mod bg-soft fw-bold">Request</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
