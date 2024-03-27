import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap";
import { TextField } from "@material-ui/core";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import PatientDialog from "pages/Appointment/Dialog/PatientDialog";
import api from "services/Api";

export default function SetupChargeCategoryDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [chargetypes, setChargetypes] = useState([]);
  // const [chargename, setChargename] = useState();

  const [openChargeCategoryDialog, setOpenChargeCategoryDialog] =
    React.useState(false);

  const handleClickOpen = () => {
    //dialog open
    setOpenChargeCategoryDialog(true);
  };

  const handleDialogClose = () => {
    //dialog close
    setOpenChargeCategoryDialog(false);
  };

  useEffect(() => {
    getChargeType();
  }, []);

  const getChargeType = async () => {
    const response = await api.getChargetype();
    const { data } = response;
    console.log(data, "ppppppp");
    setChargetypes(data);
  };

  // const getChargename = async () => {
  //   const response = await api.getSetupChargeName();
  //   const { data } = response;
  //   console.log(data, "ppppppp");
  //   setChargename(data);
  // };

  console.log(chargetypes, "chargetype");

  console.log(data, "dataaaaaaa");
  const styles = {
    label_text: {
      color: "#1C2253",
      fontSize:'14px',
      fontWeight:'500',
    },
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
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "600px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" className="bg-primary text-white">
          Add Charges
        </DialogTitle>
        <DialogContent className="mt-4 ms-2 " style={styles.label_text}>
          <Container className="p-2">
            <Row>
              <label>Charge Type<span className="text-danger ms-1">*</span></label>
              <br />
              <select
                style={{
                  height: "40px",
                  border: "1px solid #8F98B3",
                  borderRadius: "8px",
                }}
                id="charge_type_id"
                value={data.charge_type_id}
                onChange={(e) => onChange(e)}
              >
                <option>select</option>
                {chargetypes &&
                  chargetypes.map((charge_type) => (
                    <option key={charge_type.id} value={charge_type.id}>
                      {charge_type.charge_type}
                    </option>
                  ))}
              </select>
            </Row>
            <br />
            <Row>
              <label>Name<span className="text-danger ms-1">*</span></label>
              <br />
              <input
                id="name"
                value={data.name}
                onChange={(e) => onChange(e)}
                style={{
                  height: "40px",
                  border: "1px solid #8F98B3",
                  borderRadius: "8px",
                }}
              ></input>
            </Row>
            <br />
            <Row>
              <label>Description<span className="text-danger ms-1">*</span></label>
              <br />
              <textarea
                style={{
                  height: "50px",
                  border: "1px solid #8F98B3",
                  borderRadius: "8px",
                }}
                id="description"
                value={data.description}
                onChange={(e) => onChange(e)}
              ></textarea>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          <button
            className="btn-mod bg-primary btn-md"
            onClick={() => handleFormSubmit(handleClose())}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
