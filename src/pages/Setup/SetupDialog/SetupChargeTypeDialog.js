import React, { useState, useEffect } from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"
import { object } from "prop-types"

export default function SetupChargeTypeDialog({
  open,
  handleClose,
  data,
  onChange,
  // handleFormSubmit,
  getChargeType
})

{
  const [chargeType,setChargType] = useState({})
  const [checkCheckbox,setCheckCheckbox] = useState({
    appointment:false,
    opd:false,
    opd:false,
    patholody:false,
    radiology:false,
    bloodbank:false
  })
  const handleChanges = async (event) =>{
    const {id,value} = event.target
    console.log(value,"ee");
    setChargType({name:value})
  }
  const handleSubmit = async () =>{
  console.log(chargeType,"loging",checkCheckbox);
  const trueValuedKeys = Object.keys(checkCheckbox).filter(key => checkCheckbox[key]);
  console.log(trueValuedKeys,"llllll");
  const data = {
    charge_type:chargeType.name,
    is_default: "yes",
    is_active: "yes",
    Hospital_id:1,
  }
  console.log(data,"all datas");
  const responses = await api.postSetup_chargeType_setup(data)
  console.log(responses,";;;;");
  const isAnyTrue = Object.values(checkCheckbox).some((value) => value === true);
  console.log(responses?.data,"dd",isAnyTrue,"cheyyy");
  if(responses?.data && isAnyTrue){
    console.log(responses?.data?.[0].data.id ,"nonono",trueValuedKeys);
    // const parse = JSON.parse(responses?.data[0])
    trueValuedKeys.map((async val=>{
      const datas = {
        charge_type_master_id: responses.data[0]?.data.id ,
        module_shortcode:val,
        Hospital_id:1
      }
      console.log(datas,"Every data");
     const response = await api.postSetup_ChargeType_module(datas)
     console.log(response,"all response");
    //  location.reload()
    }))
  }
  handleClose()
  getChargeType()
  }
  const handleChange = (event) => {
    const { name, checked } = event.target;
    console.log(name,checked,"getting");
    setCheckCheckbox((prevCheckCheckbox) => ({
      ...prevCheckCheckbox,
      [name]: checked,
    }));
  };
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
          Add Charge Type
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container>
            <Row>
              <label>Charge Type</label>
              <br />
              <input style={{ width: "100%", height: "30px" }} id="charge_type" value={chargeType.name} onChange={handleChanges}></input>
            </Row>
            <br />
            <br />
            <Row>
              <label>Module</label>
            </Row>
            <Row>
              <Col>
                <div className="d-flex align-items-center">
                  <input name="appointment" onChange={handleChange} type="checkbox"  className="me-2" />
                  <p className="mt-3 fw-bold">Appointment</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="d-flex align-items-center">
                  <input name="opd" onChange={handleChange} type="checkbox" className="me-2" />
                  <p className="mt-3 fw-bold">OPD</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="d-flex align-items-center">
                  <input name="ipd" onChange={handleChange} type="checkbox" className="me-2" />
                  <p className="mt-3 fw-bold">IPD</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="d-flex align-items-center">
                  <input name="pathology" onChange={handleChange} type="checkbox" className="me-2" />
                  <p className="mt-3 fw-bold">Pathology</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="d-flex align-items-center">
                  <input name="radiology" onChange={handleChange} type="checkbox" className="me-2" />
                  <p className="mt-3 fw-bold">Radiology</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="d-flex align-items-center">
                  <input name="bloodbank" onChange={handleChange} type="checkbox" className="me-2" />
                  <p className="mt-3 fw-bold">Blood Bank</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="d-flex align-items-center">
                  <input name="ambulance" onChange={handleChange} type="checkbox" className="me-2" />
                  <p className="mt-3 fw-bold">Ambulance</p>
                </div>
              </Col>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          <button
            className="btn-mod bg-soft btn-md"
            onClick={()=>handleSubmit()}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
