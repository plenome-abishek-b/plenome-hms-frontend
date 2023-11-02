import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { useState } from "react"
import api from "services/Api"

export default function SetupRadiologyParameterDialog({
  open,
  handleClose,
  data,
}) {
  const [units,setUnits] = useState([])
  const [formData,setFormData] = useState({
    parameter_name:'',
    reference_range:'',
    test_value:'',
    unit:'',
    gender:'',
    description:'',
    created_at:'2021-12-01 11:11:11'
  })
  const handleChange = (event) =>{
    const {name,value} = event.target
    setFormData({...formData,[name]:value})
  }
  const handleFormSubmit = async () =>{
    const response = await api.postRadiologyparameter(formData)
  }
  const getUnits =async () =>{
   const response = await api.getRadiologyUnit()
   const {data} = response 
   setUnits(data)
  }
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
        <DialogTitle
          id="alert-dialog-title"
          className="bg-primary bg-soft text-primary"
        >
          Add Radiology Category
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container className="p-2">
            <Row>
              <label>Parameter Name</label>
              <br />
              <input name="parameter_name" onChange={handleChange} value={formData.parameter_name}></input>
            </Row>
            <br />
            <Row>
              <label>Reference Range</label>
              <br />
              <input name="reference_range" onChange={handleChange} value={formData.reference_range}></input>
            </Row>
            <br />
            <Row>
              <label>Unit</label>
              <br />
              <select name="unit" onClick={()=>getUnits()} onChange={handleChange} value={formData.unit}>
                <option>select one</option>
                {units.map((val=>(
                <option key={val.id} value={val.id}>{val.unit_name}</option>
                )))}
              </select>
            </Row>
            <br />
            <Row>
              <label>Description</label>
              <br />
              <input name="description" onChange={handleChange} value={formData.description}></input>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          <button
            className="btn btn-primary bg-soft btn-sm"
            onClick={() => handleFormSubmit(handleClose())}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}