import React, { useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Label, Input } from "reactstrap"
import { TextField } from "@mui/material"
import TextArea from "antd/es/input/TextArea"
import { useFormik } from "formik"
import api from "services/Api"

export default function VisitorDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [purpose, setPorpose] = useState([])
  const getPurpose = async () => {
    const response = await api.getFrontofficeSetupVisitorsPurpose()
    const { data } = response
    setPorpose(data)
    console.log(data)
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className='text-white fw-bold' style={{backgroundColor: '#92A4FF'}}>Add Visitor Details</DialogTitle>
        <DialogContent>
          <br />
          <Row>
            <Col>
              {/* <TextField
                                id='purpose'
                                label='purpose'
                                size='small'
                                value={data.purpose}
                                onChange={e => onChange(e)}
                            /> */}
              <label>Purpose</label>
              <br />
              <select
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                value={data.purpose}
                onChange={e => onChange(e)}
                id="purpose"
                onClick={() => getPurpose()}
              >
                <option>select</option>
                {purpose &&
                  purpose.map(val => (
                    <option
                      key={val.visitors_purpose}
                      value={val.visitors_purpose}
                    >
                      {val.visitors_purpose}
                    </option>
                  ))}
              </select>
            </Col>
            {/* <Col>
                        <TextField
                                label='Name'
                                id='ipd/opd/staff'
                                size='small'
                                value={data.name}
                                onChange={e => onChange(e)}
                            />
                        </Col> */}
            <Col>
              <label>Name</label>
              <br />
              <input
                id="name"
                size="small"
                value={data.name}
                onChange={e => onChange(e)}
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Number of Person</label>
              <br />
              <input
                label=""
                id="no_of_pepple"
                size="small"
                value={data.no_of_pepple}
                onChange={e => onChange(e)}
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              />
            </Col>
            <Col>
            <label>Phone</label>
            <br />
              <input
                id="contact"
                size="small"
                value={data.contact}
                onChange={e => onChange(e)}
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
            <label>IPD/OPD/Staff</label>
            <br />
              <input
                id="visit_to"
                size="small"
                // value={data.visit_to}
                onChange={e => onChange(e)}
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              />
            </Col>
            <Col>
            <label>Visit To</label>
            <select
              id="visit_to"
              value={data.visit_to}
              style={{ width: "100%", height: '30px',border: "1px solid grey",
                  borderRadius: "5px", }}
              onChange={e => onChange(e)}
            >
              <option>select</option>
              <option key="staff" value="staff">
                Staff
              </option>
              <option key="opd patient" value="opd patinet">
                OPD Patient
              </option>
              <option key="ipd patient" value="ipd patient">
                IPD Patient
              </option>
            </select>
            </Col>
           
            <Col>
            <label>Related To</label>
              <input
                id="related_to"
                size="small"
                value={data.related_to}
                onChange={e => onChange(e)}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
            <label>ID Card</label>
              <input
                id="id_proof"
                placeholder=""
                size="small"
                value={data.id_proof}
                onChange={e => onChange(e)}
                style={{ width: "100%", height: '30px',border: "1px solid grey",
                  borderRadius: "5px", }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>In Time</label>
              <br />
              <input
                id="in_time"
                type="time"
                size="small"
                style={{ width: "100%", height: '30px',border: "1px solid grey",
                  borderRadius: "5px" }}
                value={data.in_time}
                onChange={e => onChange(e)}
              />
            </Col>
            <Col>
              <label>Out Time</label>
              <br />
              <input
                id="out_time"
                type="time"
                size="small"
                style={{ width: "100%", height: '30px',border: "1px solid grey",
                  borderRadius: "5px" }}
                value={data.out_time}
                onChange={e => onChange(e)}
              />
            </Col>
            <Col>
              <label> Today Date</label>
              <br />
              <Input
                id="date"
                type="date"
                size="small"
                style={{ width: "100%", height: '30px',border: "1px solid grey",
                  borderRadius: "5px" }}
                value={data.date}
                onChange={e => onChange(e)}
              ></Input>
            </Col>
          </Row>
          <br />
          <Label>Note</Label>
          <br />
          <TextArea
            id="note"
            rows={3}
            placeholder="Note"
            value={data.note}
            onChange={e => onChange(e)}
            style={{ width: "100%", height: '50px',border: "1px solid grey",
                  borderRadius: "5px" }}
          />
          <br />
          <br />
          <Label>Image</Label>
          <Input
            type="file"
            id="image"
            value={data.image}
            onChange={e => onChange(e)}
            style={{ width: "100%", height: '30px',border: "1px solid grey",
                  borderRadius: "5px" }}
          ></Input>
          <br />
        </DialogContent>
        <DialogActions>
          <button className="btn btn-danger" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleFormSubmit()}
            autoFocus
          >
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
