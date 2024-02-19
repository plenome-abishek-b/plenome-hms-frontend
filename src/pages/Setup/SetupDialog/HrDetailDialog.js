import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import api from "services/Api";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getCloseIcon } from "antd/es/notification/PurePanel";

export default function HrDetailDialog({
  location,
  getAllStaff,
  open,
  handleClose,
  staffDetail,
}) {
  const [formattedDate, setFormattedDate] = React.useState();

  console.log(staffDetail, "llll");
  const history = useHistory();
  const handleDisable = async (id) => {
    console.log(id, "getting id");
    const response = await api.disableStaff_HR_mainModule(id);
    console.log(response, "response");
    handleClose();
    history.push("/hr");
    getAllStaff();
  };
  const handleDelete = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (userConfirmed) {
      console.log(userConfirmed, id, "delete");

      const response = await api.deleteStaff_HR_mainModule(id);
      getAllStaff();
      handleClose();
    } else {
      console.log("no no");
    }
  };
  const handleEnable = async (id) => {
    const response = await api.enableStaff_HR_mainModule(id);
    console.log(response, "response");
    getAllStaff();
    handleClose();
    history.push("/hr");
  };
  //   const specialistNameConcat = staffDetail['group_concat(DISTINCT specialist.specialist_name)'];
  var dob = new Date(staffDetail?.dob);
  var DobOnly = dob.toISOString().split("T")[0];

  var dateOfJoining = new Date(staffDetail?.date_of_joining);
  var formattedDateOfJoining = dateOfJoining.toLocaleDateString("en-US");

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
            <h4 className="fw-bold">{staffDetail?.name}</h4>
            <hr />
            <div>
              <h6>Staff ID: {staffDetail?.employee_id}</h6>
            </div>
            <hr />
            <div>
              <h6>Role: {staffDetail?.role_name}</h6>
            </div>
            <hr />

            <div>
              <h6>Designation: {staffDetail?.designation}</h6>
            </div>
            <hr />

            <div>
              <h6>Department: {staffDetail?.department_name}</h6>
            </div>
            <hr />

            <div>
              <h6>EPF No: {staffDetail?.epf_no}</h6>
            </div>
            <hr />

            <div>
              <h6>Basic salary: {staffDetail?.basic_salary}</h6>
            </div>
            <hr />

            <div>
              <h6>Contract Type: {staffDetail?.contract_type}</h6>
            </div>
            <hr />

            <div>
              <h6>Work Shift: {staffDetail?.shift}</h6>
            </div>
            <hr />

            <div>
              <h6>Work Location: {staffDetail?.location}</h6>
            </div>
            <hr />

            <div>
              <h6>Date of Joining: {formattedDateOfJoining}</h6>
            </div>
          </div>

          {/* <h6> Specialist: {specialistNameConcat}</h6> */}
        </div>

        {/* Right side content (85%) */}
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
            Staff Details
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
              {location === "enable" ? (
                // Enable button for right side
                <div className="ms-3">
                  <button
                    className="btn bg-soft btn-md text-white fw-bold"
                    onClick={() => handleDisable(staffDetail?.id)}
                    style={{ padding: "7px", backgroundColor: '#FFA732' }}
                  >
                    <i className="fas fa-user-slash"></i>
                    &nbsp;Disable
                  </button>
                </div>
              ) : (
                // Disable and Delete buttons for right side
                <>
                  <div className="ms-3">
                    <button
                      className="btn btn-success btn-md text-white"
                      onClick={() => handleEnable(staffDetail?.id)}
                      style={{ padding: "7px" }}
                    >
                      <i className="fas fa-lock-open"></i>
                      &nbsp;Enable
                    </button>
                  </div>
                </>
              )}
              <div className="ms-3">
                <button
                  className="btn bg-soft btn-md text-white fw-bold"
                  onClick={() => handleDelete(staffDetail?.id)}
                  style={{ padding: "7px", marginRight: "10px", backgroundColor: "#B80000" }}
                >
                  <i className="fas fa-trash"></i>
                  &nbsp;Delete
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
                  <h6>Mobile Number:</h6>
                  <p>{staffDetail?.contact_no}</p>
                </div>
                <hr
                  style={{ width: "280%", margin: "0", marginBottom: "20px", color: 'rgba(0,0,0,0.2)' }}
                />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Emergency Contact No:</h6>
                  <p>{staffDetail?.emergency_contact_no}</p>
                </div>
                <hr style={{ width: "280%", color: 'rgba(0,0,0,0.2)'  }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Email:</h6>
                  <p>{staffDetail?.email}</p>
                </div>
                <hr style={{ width: "280%", color: 'rgba(0,0,0,0.2)'  }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Gender:</h6>
                  <p>{staffDetail?.gender}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Blood Group:</h6>
                  <p>{staffDetail?.bloodgroup}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Date Of Birth:</h6>
                  <p>{DobOnly}</p>
                </div>
                <hr style={{ width: "280%", color: 'rgba(0,0,0,0.2)'  }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Marital Status:</h6>
                  <p>{staffDetail?.marital_status}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Father Name:</h6>
                  <p>{staffDetail?.father_name}</p>
                </div>
                <hr style={{ width: "280%", color: 'rgba(0,0,0,0.2)'  }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Mother Name:</h6>
                  <p>{staffDetail?.mother_name}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Qualification:</h6>
                  <p>{staffDetail?.qualification}</p>
                </div>
                <hr style={{ width: "280%", color: 'rgba(0,0,0,0.2)'  }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Work Experience:</h6>
                  <p>{staffDetail?.work_exp}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Specialization:</h6>
                  <p>{staffDetail?.specialization}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Note:</h6>
                  <p>{staffDetail?.note}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Pan Card:</h6>
                  <p>{staffDetail?.pan_card}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />
                <div style={{ marginBottom: "10px" }}>
                  <h6>Pan Card:</h6>
                  <p>{staffDetail?.pan_number}</p>
                </div>
                <hr style={{ width: "280%" , color: 'rgba(0,0,0,0.2)' }} />

                <div style={{ marginBottom: "10px" }}>
                  <h6>National Identification Number:</h6>
                  <p>{staffDetail?.pan_number}</p>
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
