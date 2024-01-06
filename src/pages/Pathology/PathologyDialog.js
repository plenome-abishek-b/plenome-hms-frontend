import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col } from "reactstrap"
import { TextField } from "@mui/material"
import api from "services/Api"

export default function PathologyDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [pathCategoryName, setPathCategoryName] = useState("")
  const [pathChargeCategory, setPathChargeCategory] = useState("")
  const [pathChargeName, setPathChargeName] = useState("")
  const [testParameterName, settestParameterName] = useState("")

  useEffect(() => {
    handlePathologyCategoryName()
    handlePathologyChargeCategory()
    handlePathologyChargeName()
    handlePathologyTestParameterName()
  }, [])

  const handleClickOpen = () => {
    //dialog open
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenDialog(false)
  }

  const handlePathologyCategoryName = async () => {
    const response = await api.getPathologyCategoryName()
    const { data } = response
    setPathCategoryName(data)
    console.log(data, "data")
  }

  const handlePathologyChargeCategory = async () => {
    const response = await api.getPathologyChargeCategory()
    const { data } = response
    setPathChargeCategory(data)
    console.log(data, "data")
  }

  const handlePathologyChargeName = async () => {
    const response = await api.getPathologyChargeName()
    const { data } = response
    setPathChargeName(data)
    console.log(data, "data")
  }

  const handlePathologyTestParameterName = async () => {
    const response = await api.getPathologyTestParameterName()
    const { data } = response
    settestParameterName(data)
    console.log(data, "data")
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
          style={{ backgroundColor: "#6070FF" }}
          className="text-white fw-bold"
        >
          Add New Pathology
        </DialogTitle>
        <br />
        <DialogContent>
          <Row>
            <Col>
              <label>
                Test Name <span className="text-danger">*</span>
              </label>
              <br />
              <input
                style={{
                  width: "90%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                value={data.test_name}
                id="test_name"
                onChange={e => onChange(e)}
              ></input>
            </Col>
            <Col>
              <label>
                Short Name <span className="text-danger">*</span>
              </label>
              <br />
              <input
                style={{
                  width: "90%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                value={data.short_name}
                id="short_name"
                onChange={e => onChange(e)}
              ></input>
            </Col>
            <Col>
              <label>Test Type</label>
              <br />
              <input
                style={{
                  width: "90%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                value={data.test_type}
                id="test_type"
                onChange={e => onChange(e)}
              ></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>
                Category Name <span className="text-danger">*</span>
              </label>
              <br />
              <select
                style={{
                  width: "90%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                value={data.category_name}
                id="category_name"
                onChange={e => onChange(e)}
              >
                <option>select</option>
                {pathCategoryName &&
                  pathCategoryName.map(pathcat => (
                    <option key={pathcat.id} value={pathcat.id}>
                      {pathcat.category_name}
                    </option>
                  ))}
              </select>
            </Col>
            <Col>
              <label>Sub Category</label>
              <br />
              <input
                style={{
                  width: "90%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                value={data.sub_category}
                id="sub_category"
                onChange={e => onChange(e)}
              ></input>
            </Col>
            <Col>
              <label>Method</label>
              <br />
              <input
                style={{
                  width: "90%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                value={data.method}
                id="method"
                onChange={e => onChange(e)}
              ></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Report Days</label>
              <br />
              <input
                style={{
                  width: "90%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                value={data.report_days}
                id="report_days"
                onChange={e => onChange(e)}
              ></input>
            </Col>
            <Col>
              <label>
                Charge Category <span className="text-danger">*</span>
              </label>
              <br />

              <select
                style={{
                  width: "90%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                value={data.name}
                id="name"
                onChange={e => onChange(e)}
              >
                <option>select</option>
                {pathChargeCategory &&
                  pathChargeCategory.map(chargecat => (
                    <option key={chargecat.id} value={chargecat.id}>
                      {chargecat.name}
                    </option>
                  ))}
              </select>
            </Col>
            <Col>
              <label>
                Charge name <span className="text-danger">*</span>
              </label>
              <br />
              <select
                style={{
                  width: "90%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                value={data.charge_name}
                id="charge_name"
                onChange={e => onChange(e)}
              >
                <option>select</option>
                {pathChargeName &&
                  pathChargeName.map(charnam => (
                    <option key={charnam.id} value={charnam.id}>
                      {charnam.name}
                    </option>
                  ))}
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Tax</label>
              <br />
              <input
                placeholder="%"
                style={{
                  width: "90%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              ></input>
            </Col>
            <Col>
              <label>
                Standard Charge <span className="text-danger">*</span>
              </label>
              <br />
              <input
                style={{
                  width: "90%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                value={data.charge_name}
                id="charge_name"
                onChange={e => onChange(e)}
              ></input>
            </Col>
            <Col>
              <label>
                Amount <span className="text-danger">*</span>
              </label>
              <br />
              <input
                style={{
                  width: "90%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                value={data.charge_name}
                id="charge_name"
                onChange={e => onChange(e)}
              ></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>
                Test Parameter Name <span className="text-danger">*</span>
              </label>
              <br />
              <select
                style={{
                  width: "90%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                value={data.parameter_name}
                id="parameter_name"
                onChange={e => onChange(e)}
              >
                <option>select</option>
                {testParameterName &&
                  testParameterName.map(paramname => (
                    <option key={paramname.id} value={paramname.id}>
                      {paramname.parameter_name}
                    </option>
                  ))}
              </select>
            </Col>
            <Col>
              <label>
                Reference Range <span className="text-danger">*</span>
              </label>
              <br />
              <input
                style={{
                  width: "90%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                value={data.reference_range}
                id="reference_range"
                onChange={e => onChange(e)}
              ></input>
            </Col>
            <Col>
              <label>
                Unit <span className="text-danger">*</span>
              </label>
              <br />
              <input
                style={{
                  width: "90%",
                  height: "30px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                value={data.unit}
                id="unit"
                onChange={e => onChange(e)}
              ></input>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-danger fw-bold" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn-mod fw-bold"
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
