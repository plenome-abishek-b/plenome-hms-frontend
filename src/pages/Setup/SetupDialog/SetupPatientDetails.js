import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import api from "services/Api";
import { Row, Col } from "reactstrap";

export default function SetupPatientDetails({
  open,
  handleClose,
  patientDetail,
  getSetup_Patient,
  location,
}) {
  console.log(patientDetail, "patientdetails");
  const handleDisable = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to disable it?"
    );
    console.log(userConfirmed, "disable");
    if (userConfirmed) {
      const newData = {
        id: patientDetail[0].id,
        is_active: "no",
      };
      const response = await api.updateDisable_Patient(newData);
      getSetup_Patient();
      handleClose();
    }
  };
  const handleEnable = async () => {
    const userConfirmed = window.confirm("Are you sure you want to enable it?");
    console.log(userConfirmed, "enable");
    if (userConfirmed) {
      const newData = {
        id: patientDetail[0].id,
        is_active: "yes",
      };
      const response = await api.updateDisable_Patient(newData);
      getSetup_Patient();
      handleClose();
    } else {
      console.log("error");
    }
  };
  return (
    // <div style={{width:'100px',height:'200px',backgroundColor:'black'}}>SetupPatientDetails</div>
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
        PaperProps={{
          style: {
            width: "95%", // adjust the width as needed
            height: "100%", // adjust the height as needed
            maxHeight: "auto", // adjust the max height as neededs
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" className="bg-primary text-white">
          Patient Details
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: 'end'
            }}
          >
            {location === "enable" ? (
              <button
                className="btn btn-success btn-md"
                onClick={() => handleEnable()}
                style={{ padding: "7px" }}
              >
                enable
              </button>
            ) : (
              <button
                className="btn btn-danger btn-md"
                onClick={() => handleDisable()}
                style={{ padding: "7px" }}
              >
                disable
              </button>
            )}
          </div>
        </DialogTitle>

        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col>
              <h2>Patient Name: {patientDetail[0]?.patient_name}</h2>
            </Col>
            <Col>
              <h5>Guardian Name: {patientDetail[0]?.guardian_name}</h5>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <h5 style={{ marginRight: "10px" }}>
                Abha No:
                {patientDetail[0]?.ABHA_number
                  ? patientDetail[0]?.ABHA_number
                  : "nan"}
              </h5>
            </Col>
            <Col>
              <h5>Mobile No: {patientDetail[0]?.mobileno}</h5>
            </Col>
          </Row>

          <br />
          <Row>
            <Col>
              <h5>Gender: {patientDetail[0]?.gender}</h5>
            </Col>
            <Col>
              <h5>Address: {patientDetail[0]?.address}</h5>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <h5>Known Allergies: {patientDetail[0]?.known_allergies}</h5>
            </Col>
            <Col>
              <h5>Age: {patientDetail[0]?.age}</h5>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <h5>Date of Birth: {patientDetail[0]?.dob}</h5>
            </Col>
            <Col>
              <h5>
                TPA ID:{" "}
                {patientDetail[0]?.insurance_id
                  ? patientDetail[0]?.insurance_id
                  : "nan"}
              </h5>
            </Col>
          </Row>
          <br />
          <div>
            <h4>Patient Visit Report</h4>
          </div>
        </DialogContent>
        <DialogActions>
          {/* {selectedData?.specialist_name ? */}
          <button
            className="btn-mod bg-soft btn-md"
            // onClick={() => handleSubmit()}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
          {/* :<button className="btn-mod bg-soft btn-md" onClick={()=>handleSubmit()} style={{marginRight: '3%'}}>
          Save
        </button>
           } */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

// export default SetupPatientDetails
