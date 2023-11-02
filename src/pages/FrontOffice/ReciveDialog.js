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

export default function ReceiveDialog({ open, handleClose, data }) {
  const [formData, setFormData] = useState({
    date: "",
    from_title: "",
    address: "",
    note: "",
    to_title: "",
    reference_no: "",
    type: "receive",
    created_at: "2012-10-11 11:11:11",
  })

  const handleChange = e => {
    const { value, name } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handleFormSubmit = async () => {
    const response = await api.postFrontofficeReceiver(formData)
  }
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
          className="text-white fw-bold"
          style={{ backgroundColor: "#92A4FF" }}
        >
          Add Receive
        </DialogTitle>
        <DialogContent>
          <br />
          <Row>
            <Col>
              <label>To Title</label>
              <br />
              <input
                name="to_title"
                label="To title"
                size="small"
                value={formData.to_title}
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              />
            </Col>
            <Col>
              <label>Reference No</label>
              <br />
              <input
                name="reference_no"
                size="small"
                value={formData.reference_no}
                onChange={handleChange}
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
              <label>Form Title</label>
              <br />
              <input
                name="from_title"
                label="Form Title"
                id="no_of_pepple"
                size="small"
                value={formData.from_title}
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              />
            </Col>
            <Col>
              <label>Today date</label>
              <br />
              <input
                // label='Form Title'
                name="date"
                type="date"
                id="no_of_pepple"
                size="small"
                value={formData.date}
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              />
            </Col>
            {/* <Col>
                            <TextField
                                label='Phone'
                                id='contact'
                                type='date'
                                size='small'
                                value={data.contact}
                                onChange={e => onChange(e)}
                            />
                        </Col> */}
          </Row>
          <br />

          <br />
          <label>Address</label>
          <br />
          <input
            name="address"
            rows={3}
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            style={{
              width: "100%",
              height: "30px",
              border: "1px solid grey",
              borderRadius: "5px",
            }}
          />
          <br />
          <br />
          <label>Note</label>
          <br />
          <input
            name="note"
            rows={3}
            placeholder="Note"
            value={formData.note}
            onChange={handleChange}
            style={{
              width: "100%",
              height: "30px",
              border: "1px solid grey",
              borderRadius: "5px",
            }}
          />
          <br />
          <br />
          <label>Attach document</label>
          <input
            type="file"
            name="image"
            value={formData.image}
            onChange={handleChange}
            style={{
              width: "100%",
              height: "30px",
              border: "1px solid grey",
              borderRadius: "5px",
            }}
          ></input>
          <br />
        </DialogContent>
        <DialogActions>
          <button className="btn btn-danger" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleFormSubmit(handleClose())}
            autoFocus
          >
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
