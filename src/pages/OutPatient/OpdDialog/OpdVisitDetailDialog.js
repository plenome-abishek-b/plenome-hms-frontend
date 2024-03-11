import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import api from "services/Api";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getCloseIcon } from "antd/es/notification/PurePanel";

export default function OpdVistDetailDialog({
    completeData,
    // opdid,
  getAllStaff,
  open,
  handleClose,
  staffDetail,
}) {
  const [formattedDate, setFormattedDate] = React.useState();

  console.log(staffDetail, "llll");
  const history = useHistory();
//   const handleDisable = async (id) => {
//     console.log(id, "getting id");
//     const response = await api.disableStaff_HR_mainModule(id);
//     console.log(response, "response");
//     handleClose();
//     history.push("/hr");
//     getAllStaff();
//   };
  const handleDelete = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (userConfirmed) {
      console.log(userConfirmed, id, "delete");

      const response = await api.deleteStaff_HR_mainModule(id);
      getAllStaff();
      handleClose();
      history.push("/hr#tab_content_1");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      console.log("no no");
    }
  };
//   const handleEnable = async (id) => {
//     const response = await api.enableStaff_HR_mainModule(id);
//     console.log(response, "response");
//     getAllStaff();
//     handleClose();
//     history.push("/hr");
//     setTimeout(() => {
//       window.location.reload();
//     }, 500);
//   };
//   var dob = new Date(staffDetail?.dob);
//   var DobOnly = dob.toISOString().split("T")[0];

  var dateOfJoining = new Date(staffDetail?.date_of_joining);
  var formattedDateOfJoining = dateOfJoining.toLocaleDateString("en-US");
  console.log(completeData,"completeData")

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        PaperProps={{
          style: {
            display: "flex",
            flexDirection: "row", 
            width: "100%",
          },
        }}
      >
        <div
          style={{
            flex: "0 0 25%", 
            backgroundColor: "#fff",
            padding: "20px",
            borderRight: "1px solid #ccc", 
          }}
        >
          <div className="text-white p-4 text-start" style={{backgroundColor: '#7070FF'}}>
            <h4 className="fw-bold">{completeData?.patient_name}</h4>
            <hr />
            <div>
              <h6>OPD Checkup ID: {completeData?.OPD_checkup_id}</h6>
            </div>
            <hr />
            <div>
              <h6>Case ID: {completeData?. case_reference_id}</h6>
            </div>
            <hr />

            <div>
              <h6>Old patient: {completeData?.patient_old ? completeData?.patient_old : 'null'}</h6>
            </div>
            <hr />

            <div>
              <h6>Gender: {completeData?.gender}</h6>
            </div>
            <hr />

            <div>
              <h6>Phone: {completeData?.mobileno}</h6>
            </div>
            {/* <hr /> */}
            <hr />

            <div>
              <h6>Address: {completeData?.address ? completeData?.address : 'null'}</h6>
            </div>
            <hr />

            <div>
              <h6>Blood gruop: {completeData?.blood_group ? completeData?.blood_group : 'null'}</h6>
            </div>
            <hr />

            <div>
              <h6>weight: {completeData?.weight ? completeData?.weigh : 'null'}</h6>
            </div>
            <hr />
            <div>
              <h6>Pulse: {completeData?.pulse ? completeData?.pulse : 'null'}</h6>
            </div>
            <hr/>
          <div>
              <h6>Appointment Date: {completeData?.appointment_date ? completeData?.appointment_date : 'null'}</h6>
            </div>
            <hr/>
            <div>
              <h6>Respiration: {completeData?.respiration ? completeData?.respiration : 'null'}</h6>
            </div>
          </div>
         
        </div>

        <div
          style={{
            flex: "0 0 75%", // 85% width
            backgroundColor: "#fff",
            padding: "20px",
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            className="text-primary fw-bold bg-dark bg-soft"
          >
            Visit Details
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginLeft: "20px",
                position: 'absolute',
                right: '20px',
                top: '30px'
              }}
            >
              {/* {location === "enable" ? (
                // Enable button for right side
                <div className="ms-3">
                  <button
                    className="btn bg-soft btn-sm text-white fw-bold"
                    onClick={() => handleDisable(staffDetail?.id)}
                    style={{ padding: "7px", backgroundColor: '#FFA732' }}
                  >
                    <i className="fas fa-user-slash"></i>
                    &nbsp;Disable
                  </button>
                </div>
              ) : ( */}
                {/* // Disable and Delete buttons for right side */}
                <>
                  {/* <div className="ms-3">
                    <button
                      className="btn btn-sm text-white fw-bold"
                      onClick={() => handleEnable(staffDetail?.id)}
                      style={{ padding: "7px" , backgroundColor: "#5BB318"}}
                    >
                      <i className="fas fa-lock-open"></i>
                      &nbsp;Enable
                    </button>
                  </div> */}
                </>
              {/* )} */}
              <div className="ms-3">
                <button
                  className="btn bg-soft btn-sm text-white fw-bold"
                  onClick={() => handleDelete(staffDetail?.id)}
                  style={{ padding: "7px", marginRight: "10px", backgroundColor: "#B80000" }}
                >
                  <i className="fas fa-trash"></i>
                  &nbsp;
                </button>
              </div>
              <div className="ms-3">
                <button
                  className="btn bg-soft btn-sm text-white fw-bold"
                  onClick={() => handleDelete(staffDetail?.id)}
                  style={{ padding: "7px", marginRight: "10px", backgroundColor:'green' }}
                >
                  <i className="fas fa-pencil-alt"></i>
                  &nbsp;
                </button>
              </div>
            </div>
            {/* )} */}
          </DialogTitle>
          <DialogContent className=" ms-2" style={{ padding: "20px" }}>
            {/* Your right side content here */}
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: "0 0 50%", marginRight: "20px" }}>
                <div style={{ marginBottom: "10px" }}>
                <div style={{ marginBottom: "10px" }}>
                  <h6>OPD ID:</h6>
                  <p>{completeData?.OPD_ID ? completeData?.OPD_ID : 'null'}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Patient Name:</h6>
                  <p>{completeData?.patient_name}</p>
                </div>
                <hr style={{ width: "280%", color: 'rgba(0,0,0,0.2)'  }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Marital Status:</h6>
                  <p>{completeData?.marital_status ? completeData?.marital_status : 'null'}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Guardian Name:</h6>
                  <p>{completeData?.guardian_name ? completeData?.guardian_name:'null'}</p>
                </div>
                <hr style={{ width: "280%", color: 'rgba(0,0,0,0.2)'  }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Email:</h6>
                  <p>{completeData?.email ? completeData?.email : 'null'}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Age:</h6>
                  <p>{completeData?.age ? completeData?.age : 'null'}</p>
                </div>
                <hr style={{ width: "280%", color: 'rgba(0,0,0,0.2)'  }} />
                  <h6>Casuality:</h6>
                  <p>{completeData?.casualty ? completeData?.casualty : 'null'}</p>
                </div>
                <hr
                  style={{ width: "280%", margin: "0", marginBottom: "20px", color: 'rgba(0,0,0,0.2)' }}
                />
                <div style={{ marginBottom: "10px" }}>
                  <h6>TPA:</h6>
                  <p>{completeData?.TPA ? completeData?.TPA : 'null'}</p>
                </div>
                <hr style={{ width: "280%", color: 'rgba(0,0,0,0.2)'  }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Note:</h6>
                  <p>{completeData?.note ? completeData?.note : 'null'}</p>
                </div>
                <hr style={{ width: "280%", color: 'rgba(0,0,0,0.2)'  }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Symptoms:</h6>
                  <p>{completeData?.symptoms ? completeData?.symptoms : 'null'}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Height:</h6>
                  <p>{completeData?.height ? completeData?.height : 'null'}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>BP:</h6>
                  <p>{completeData?.bp ? completeData?.bp : 'null'}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Temperature:</h6>
                  <p>{completeData?.temperature ? completeData?.temperature : 'null'}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Known allargies:</h6>
                  <p>{completeData?.known_allergies ? completeData?.known_allergies : 'null'}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Case:</h6>
                  <p>{completeData?.case_type ? completeData?.case_type : 'null'}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Refference:</h6>
                  <p>{completeData?.refference ? completeData?.refference : 'null'}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />

                <div style={{ marginBottom: "10px" }}>
                  <h6>Consultant Doctor:</h6>
                  <p>{completeData?.doctor ? completeData?.doctor : 'null'}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                                <div style={{ marginBottom: "10px" }}>
                  <h6>Symptoms:</h6>
                  <p>{completeData?.symptoms ? completeData?.symptoms : 'null'}</p>
                </div>
              </div>
            </div>
          </DialogContent>

          <DialogActions>
            {/* Save button and additional actions */}
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
