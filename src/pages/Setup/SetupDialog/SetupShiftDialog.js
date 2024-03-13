import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Row, Col, Container, Label, Input } from "reactstrap";
import { TextField } from "@material-ui/core";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import PatientDialog from "pages/Appointment/Dialog/PatientDialog";
import { useState } from "react";
import api from "services/Api";
import { useEffect } from "react";

export default function SetupShiftDialog({ open, handleClose , selectedData , getSetupAppointmentShift}) {
  const [openSetupBbDialog, setOpenSetupBbDialog] = React.useState(false);
  const [formData, setFormdata] = useState({
    name: "",
    start_time: "",
    end_time: "",
    Hospital_id: 1,
  });
  const handleClickOpen = () => {
    //dialog open
    setOpenSetupBbDialog(true);
  };

  useEffect(()=>{
    setFormdata({
    name:selectedData?.name,
    start_time:selectedData?.start_time,
    end_time:selectedData?.end_time,
    Hospital_id:1
    })
  },[selectedData])

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
  };
  const handleUpdate = async () =>{
    const data2  ={
      ...formData,
      id:selectedData?.id
    }
   const response = await api.patchSetupApptShift(data2)
   const {data} = response;
   console.log(data,"update response")
   getSetupAppointmentShift()
   handleClose()
  }

  const handleSubmit = async () => {
    const response = await api.postSetupApptShift(formData);
    const { data } = response;

    // Wait for 3 seconds before refreshing the page
    // setTimeout(() => {
    //   window.location.reload();
    // }, 3000);
    getSetupAppointmentShift()
    handleClose()
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
          Add shift
        </DialogTitle>
        <DialogContent className="mt-2 ms-2">
          <Row className="p-2">
            <label>
              Name<span className="text-danger">*</span>
            </label>
            <input
              name="name"
              onChange={handleChange}
              value={formData.name}
              type="text"
              style={{
                height: "30px",
                width: "100%",
                border: "1px solid rgba(0,0,0,0.2)",
                borderRadius: "3px",
              }}
            ></input>
          </Row>
          <br />
          <Row className="p-2">
            <label>
              Time From<span className="text-danger">*</span>
            </label>
            <input
              name="start_time"
              onChange={handleChange}
              value={formData.start_time}
              type="time"
              style={{
                height: "30px",
                width: "100%",
                border: "1px solid rgba(0,0,0,0.2)",
                borderRadius: "3px",
              }}
            ></input>
          </Row>
          <br />
          <Row className="p-2">
            <label>
              Time To<span className="text-danger">*</span>
            </label>
            <input
              name="end_time"
              onChange={handleChange}
              value={formData.end_time}
              type="time"
              style={{
                height: "30px",
                width: "100%",
                border: "1px solid rgba(0,0,0,0.2)",
                borderRadius: "3px",
              }}
            ></input>
          </Row>
        </DialogContent>
        <DialogActions>
          {selectedData?.start_time ? (<button
            className="btn-mod bg-soft btn-md"
            onClick={() => handleUpdate()}
            style={{ marginRight: "3%" }}
          >
            Saves
          </button>) :
          (
            <button
            className="btn-mod bg-soft btn-md"
            onClick={() => handleSubmit()}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
