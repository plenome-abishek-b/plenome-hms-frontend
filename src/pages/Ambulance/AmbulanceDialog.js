import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col } from "reactstrap"
import { TextField } from "@mui/material"

export default function AmbulanceDialog({ open, handleClose }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="text-white fw-bold" style={{backgroundColor: '#6070FF'}}>
          Add Ambulance call details
        </DialogTitle>
        <DialogContent>
          <br />
          <Row>
            <Col>
              <label>Driver Name</label>
              <br />
              <input
                size="small"
                id="dname"
                style={{ borderRadius: "5px", height: "30px", width: "100%", border: '1px solid grey'  }}
              />
            </Col>
            <Col>
              <label>Driver Contact</label>
              <br />
              <input
                id="dcontact"
                size="small"
                style={{ borderRadius: "5px", height: "30px", width: "100%", border: '1px solid grey'  }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Date <span className="text-danger">*</span></label>
              <br />
              <input
                size="small"
                id="date"
                style={{ borderRadius: "5px", height: "30px", width: "100%", border: '1px solid grey'  }}
              />
            </Col>
            <Col>
              <label>Amount <span className="text-danger">*</span></label>
              <br />
              <input
                size="small"
                id="amt"
                style={{ borderRadius: "5px", height: "30px", width: "100%", border: '1px solid grey'  }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Vehicle No</label>
              <br />
              <input
                label="Vehicle no"
                size="small"
                id="vehicleno"
                style={{ borderRadius: "5px", height: "30px", width: "100%", border: '1px solid grey'  }}
              />
            </Col>
            <Col>
              <label style={{ color: "grey" }}>Charge Type</label>&nbsp;
              <br />
              <select
                style={{ borderRadius: "5px", height: "30px", width: "100%", border: '1px solid grey' }}
              >
                <option>Private Ambulance</option>
                <option>ERS Transport service</option>
              </select>
            </Col>
          </Row>
        </DialogContent>
        <br />
        <DialogActions>
          <button className="btn btn-danger" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn-mod" onClick={handleClose} autoFocus>
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
