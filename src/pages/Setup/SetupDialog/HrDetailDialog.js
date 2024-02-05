import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import api from "services/Api";

export default function HrDetailDialog({
  open,
  handleClose,
  staffDetail,
  location,
}) {
    console.log(staffDetail,"llll");
  const handleDisable = async (id) => {
    console.log(id,"getting id");
    const response = await api.disableStaff_HR_mainModule(id)
    console.log(response,"response");
  };

  const handleEnable = async () => {
    // Your existing code...
  };
//   const specialistNameConcat = staffDetail['group_concat(DISTINCT specialist.specialist_name)'];
var dob = new Date(staffDetail?.dob);
var DobOnly = dob.toISOString().split('T')[0];


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
            flexDirection: "row", // Flex direction set to row
            width: "100%",
          },
        }}
      >
        {/* Left side content (15%) */}
        <div
          style={{
            flex: "0 0 25%", // 15% width
            backgroundColor: "#fff",
            padding: "20px",
            borderRight: "1px solid #ccc", // Border for separation
          }}
        >
     <div>
  <h4>{staffDetail?.name}</h4>
  {/* Your left side content here */}
  <hr/>
  <div>
    <h6>Staff ID:   {staffDetail?.employee_id}</h6>
  </div>
  <hr/>
  <div>
    <h6>Role:   {staffDetail?.role_name}</h6>
  </div>
  <hr/>

  <div>
    <h6>Designation:   {staffDetail?.designation}</h6>
  </div>
  <hr/>

  <div>
    <h6>Department:   {staffDetail?.department_name}</h6>
  </div>
  <hr/>

  <div>
    <h6>EPF No:   {staffDetail?.epf_no}</h6>
  </div>
  <hr/>

  <div>
    <h6>Basic salary:   {staffDetail?.basic_salary}</h6>
  </div>
  <hr/>

  <div>
    <h6>Contract Type:   {staffDetail?.contract_type}</h6>
  </div>
  <hr/>

  <div>
    <h6>Work Shift:   {staffDetail?.shift}</h6>
  </div>
  <hr/>

  <div>
    <h6>Work Location: {staffDetail?.location}</h6>
  </div>
  <hr/>

  <div>
    <h6>Date of Joining: {staffDetail?.date_of_joining}</h6>
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
            className="bg-primary bg-soft text-primary"
          >
            Staff Details
            {/* {location === "enable" ? (
              // Enable button for right side
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  marginLeft: "20px",
                }}
              >
                <button
                  className="btn-mod bg-soft btn-md"
                  onClick={() => handleEnable()}
                  style={{ padding: "7px" }}
                >
                  enable
                </button>
              </div>
            ) : ( */}
               {/* Disable button for right side */}
               <div
  style={{
    display: "flex",
    flexDirection: "row-reverse",
    marginLeft: "20px",
  }}
>
  <button
    className="btn-mod bg-soft btn-md"
    onClick={() => handleDelete(staffDetail?.id)}
    style={{ padding: "7px", marginRight: "10px" }}
  >
    Delete
  </button>
  <button
    className="btn-mod bg-soft btn-md"
    onClick={() => handleDisable(staffDetail?.id)}
    style={{ padding: "7px" }}
  >
    Disable
  </button>
</div>

            {/* )} */}
          </DialogTitle>
          <DialogContent className="mt-4 ms-2">
  {/* Your right side content here */}
  <div style={{ display: "flex", flexDirection: "row" }}>
    <div style={{ flex: "0 0 50%", marginRight: "20px" }}>
    <div style={{ marginBottom: "10px" }}>
        <h6>Mobile Number:</h6>
        <p>{staffDetail?.contact_no}</p>
      </div>
      <hr style={{ width: "280%", margin: "0",marginBottom:'20px' }} />
      <div style={{ marginBottom: "10px" }}>
        <h6>Emergency Contact No:</h6>
        <p>{staffDetail?.emergency_contact_no}</p>
      </div>
      <hr style={{width: "280%"}} />
      <div style={{ marginBottom: "10px" }}>
        <h6>Email:</h6>
        <p>{staffDetail?.email}</p>
      </div>
      <hr style={{width: "280%"}} />
      <div style={{ marginBottom: "10px" }}>
        <h6>Gender:</h6>
        <p>{staffDetail?.gender}</p>
      </div>
      <hr style={{width: "280%"}} />
      <div style={{ marginBottom: "10px" }}>
        <h6>Blood Group:</h6>
        <p>{staffDetail?.bloodgroup}</p>
      </div>
      <hr style={{width: "280%"}} />
      <div style={{ marginBottom: "10px" }}>
        <h6>Date Of Birth:</h6>
        <p>{DobOnly}</p>
      </div>
      <hr style={{width: "280%"}} />
      <div style={{ marginBottom: "10px" }}>
        <h6>Marital Status:</h6>
        <p>{staffDetail?.marital_status}</p>
      </div>
      <hr style={{width: "280%"}} />
      <div style={{ marginBottom: "10px" }}>
        <h6>Father Name:</h6>
        <p>{staffDetail?.father_name}</p>
      </div>
      <hr style={{width: "280%"}} />
      <div style={{ marginBottom: "10px" }}>
        <h6>Mother Name:</h6>
        <p>{staffDetail?.mother_name}</p>
      </div>
      <hr style={{width: "280%"}} />
      <div style={{ marginBottom: "10px" }}>
        <h6>Qualification:</h6>
        <p>{staffDetail?.qualification}</p>
      </div>
      <hr style={{width: "280%"}} />
      <div style={{ marginBottom: "10px" }}>
        <h6>Work Experience:</h6>
        <p>{staffDetail?.work_exp}</p>
      </div>
      <hr style={{width: "280%"}} />
      <div style={{ marginBottom: "10px" }}>
        <h6>Specialization:</h6>
        <p>{staffDetail?.specialization}</p>
      </div>
      <hr/>
      <div style={{ marginBottom: "10px" }}>
        <h6>Note:</h6>
        <p>{staffDetail?.note}</p>
      </div>
      <hr style={{width: "280%"}} />
      <div style={{ marginBottom: "10px" }}>
        <h6>Pan Card:</h6>
        <p>{staffDetail?.pan_card}</p>
      </div>
      <hr style={{width: "280%"}} />
      <div style={{ marginBottom: "10px" }}>
        <h6>Pan Card:</h6>
        <p>{staffDetail?.pan_number}</p>
      </div>
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
