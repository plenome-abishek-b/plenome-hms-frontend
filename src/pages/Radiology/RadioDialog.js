import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col } from "reactstrap"
import { TextField } from "@mui/material"
import TextArea from "antd/es/input/TextArea"
import { useEffect } from "react"
import api from "services/Api"
import { useState } from "react"

export default function RadioDialog({ open, handleClose }) {
  const [chargeCategory, setChargeCategory] = useState([])
  const [chargeName, setChargeName] = useState([])
  const [radiologyCategory, setRadiologyCategory] = useState([])
  const [testParameter, setTestParameter] = useState([])
  const [formValue, setFormValue] = useState({
    test_name: "",
    short_name: "",
    charge_category_id: "",
    test_type: "",
    radiology_category_id: "",
    sub_category: "",
    report_days: "",
    test_parameter: "",
    charge_id: "",
    amount: "",
    tax: "",
    standard_charge: "",
    created_at: "2012-12-01 11:11:11",
  })
  useEffect(() => {
    getChargeCategory()
  }, [])
  const handleChange = event => {
    const { name, value } = event.target
    setFormValue({
      ...formValue,
      [name]: value,
    })
  }
  const getChargeCategory = async () => {
    const response = await api.getIpdChargeCategory()
    const { data } = response
    setChargeCategory(data)
  }
  const getChargeName = async () => {
    const response = await api.getIpdChargeName(formValue.charge_category_id)
    const { data } = response
    console.log(data, "chargename")
    setChargeName(data)
  }
  const getRadioCategory = async () => {
    const response = await api.getRadiologyCategory()
    const { data } = response
    setRadiologyCategory(data)
    console.log(data, "data")
  }
  const getTestParmeterName = async () => {
    const response = await api.getRadiologyTestParameters(
      formValue.test_parameter
    )
    const { data } = response
    setTestParameter(data)
    console.log(data, "test parameters got it")
  }
  const handleSubmit = async () => {
    const response = await api.postRadiologyDetails(formValue)
  }
  console.log(formValue, "KKK")

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
          style={{ backgroundColor: "#377fc7" }}
          className="text-white fw-bold"
        >
          Add Radiology Details
        </DialogTitle>
        <DialogContent>
          <br />
          <Row>
            <Col lg="6" md="6" sm="12">
              <label>Test Name <span className="text-danger">*</span></label>
              <br />
              <input
                onChange={handleChange}
                value={formValue.test_name}
                name="test_name"
                id="tname"
                size="small"
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              />
            </Col>
            <Col>
              <label>Short Name <span className="text-danger">*</span></label>
              <br />
              <input
                name="short_name"
                onChange={handleChange}
                value={formValue.short_name}
                id="sname"
                size="small"
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
              <label>Test Type</label>
              <br />
              <input
                name="test_type"
                onChange={handleChange}
                value={formValue.test_type}
                id="ttype"
                size="small"
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              />
            </Col>
            <Col>
              <label>Charge Category <span className="text-danger">*</span></label>
              <br />
              <select
                name="charge_category_id"
                style={{ width: "100%", height: "30px",border: "1px solid grey",
                  borderRadius: "5px", }}
                onChange={handleChange}
                value={formValue.charge_category_id}
                  
               >
                <option>Select</option>
                {chargeCategory &&
                  chargeCategory.map(charge => (
                    <option key={charge.id} value={charge.id}>
                      {charge.name}
                    </option>
                  ))}
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Sub-Category</label>
              <br />
              <input
                onChange={handleChange}
                value={formValue.sub_category}
                name="sub_category"
                id="sctrgy"
                size="small"
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              />
            </Col>
            <Col>
              <label>Reporting Date</label>
              <br />
              <input
                onChange={handleChange}
                value={formValue.report_days}
                name="report_days"
                id="rdate"
                size="small"
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
              <label>Tax <span className="text-danger">*</span></label>
              <br />
              <input
                onChange={handleChange}
                value={formValue.tax}
                name="tax"
                id="amt"
                size="small"
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              />
            </Col>
            <Col>
              <label>Standard Charge <span className="text-danger">*</span></label>
              <br />
              <input
                onChange={handleChange}
                value={formValue.standard_charge}
                name="standard_charge"
                id="rdate"
                size="small"
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
              <label>Charge Name <span className="text-danger">*</span></label>
              <br />
              <select
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                name="charge_id"
                onClick={() => getChargeName()}
                onChange={handleChange}
                value={formValue.charge_id}
              >
                <option>Select</option>
                {chargeName &&
                  chargeName.map(val => (
                    <option key={val.id} value={val.id}>
                      {val.name}
                    </option>
                  ))}
              </select>
            </Col>
            <Col>
              <label>Category Name <span className="text-danger">*</span></label>
              <br />
              <select
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                name="radiology_category_id"
                onClick={() => getRadioCategory()}
                onChange={handleChange}
                value={formValue.radiology_category_id}
              >
                <option>Select</option>
                {radiologyCategory &&
                  radiologyCategory.map(val => (
                    <option key={val.id} value={val.id}>
                      {val.lab_name}
                    </option>
                  ))}
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              {/* <Col> */}
              <label>Amount <span className="text-danger">*</span></label>
              <br />
              <input
                name="amount"
                onChange={handleChange}
                value={formValue.amount}
                id="rdate"
                size="small"
                style={{
                  width: "100%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              />
              {/* </Col> */}
            </Col>
            <Col>
              <label>Test parameter Name <span className="text-danger">*</span></label>
              <br />
              <select
                style={{ width: "100%", height: "30px", border: "1px solid grey",
                  borderRadius: "5px", }}
                name="test_parameter"
                onChange={handleChange}
                value={formValue.test_parameter}
                onClick={() => getTestParmeterName()}
              >
                <option>select</option>
                {testParameter &&
                  testParameter.map(val => (
                    <option
                      onClick={() => getTestParmeterName()}
                      key={val.id}
                      value={val.id}
                    >
                      {val.parameter_name}
                    </option>
                  ))}
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              {testParameter &&
                testParameter.map(val => (
                  <TextField
                    onChange={handleChange}
                    name="unit"
                    label="unit"
                    value={val.unit}
                    id="rdate"
                    size="small"
                  />
                ))}
            </Col>
            <Col>
              {testParameter &&
                testParameter.map(val => (
                  <TextField
                    onChange={handleChange}
                    name="reference_range"
                    label="reference_range"
                    value={val.reference_range}
                    id="rdate"
                    size="small"
                  />
                ))}
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-danger fw-bold" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary fw-bold"
            onClick={() => handleSubmit(handleClose())}
            autoFocus
          >
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
