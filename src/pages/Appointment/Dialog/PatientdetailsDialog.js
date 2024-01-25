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
// import { Formik } from "formik"
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import "../printstyles.css";
import PrintableDetails from "./PrintableDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Patientdetails({
  open,
  handleClose,
  data,
  getAppointment,
}) {
  // Inside your component
  useEffect(() => {
    console.log("Data:", data);
  }, [data]);

  useEffect(() => {
    getAppointment();
  }, []);

  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDateTime = new Date(dateTimeString).toLocaleString(
      "en-US",
      options
    );
    return formattedDateTime;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDeleteClick = async () => {
    try {
      const toastId = toast.info(
        <div>
          <div className="text-dark">
            Are you sure you want to delete this item?
          </div>
          <div className="d-flex justify-content-end mt-3">
            {console.log(data[0]?.id, "id")}
            <button
              className="btn btn-danger btn-md"
              onClick={() => handleDeletionConfirmed(data[0]?.id)}
            >
              OK
            </button>
          </div>
        </div>,
        {
          position: toast.POSITION.TOP_CENTER,
          closeButton: false,
        }
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleDeletionConfirmed = async (appointmentId) => {
    try {
      await api.deleteAppointment(appointmentId);
      toast.dismiss();

      toast.success(
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Item deleted successfully</div>
          <button
            className="btn btn-danger btn-sm fw-bold"
            onClick={() => toast.dismiss()}
          >
            X
          </button>
        </div>,
        {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: false,
          autoClose: 500,
        }
      );

      setTimeout(() => {
        getAppointment();
      }, 500);
      handleClose();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div>
      <form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "1200px", // Set your width here
              },
            },
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            className="text-white fw-bold"
            style={{
              backgroundColor: "#6070FF",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Appointment Details
            <div>
              <button
                className="btn-sm ms-2"
                style={{
                  backgroundColor: "#6895D2",
                  border: "1px solid #6895D2",
                }}
                onClick={handlePrint}
              >
                {" "}
                <i className="fas fa-print text-white"></i>
              </button>
              <button
                className="btn-sm text-white fw-bold ms-2"
                style={{
                  backgroundColor: "#D04848",
                  border: "1px solid #D04848",
                }}
                onClick={handleClose}
              >
                {" "}
                X
              </button>
            </div>
          </DialogTitle>

          <DialogContent className="mt-4 ms-2" id="alert-dialog-content">
            

            <PrintableDetails data={data} handleDeleteClick={handleDeleteClick} handleDeletionConfirmed={handleDeletionConfirmed}/>
          </DialogContent>

          <DialogActions
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginRight: "20px",
            }}
          >
            <button
              onClick={() => handleSubmit(handleClose())}
              // onClick={handleClose}
              className="btn-mod bg-soft fw-bold"
              type="submit"
            >
              Save
            </button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
