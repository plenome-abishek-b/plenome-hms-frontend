import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { withTranslation } from "react-i18next";
import api from "services/Api";
import "./styles.css";

const Setupdoctorshift = (props) => {
  const [rowData, setRowData] = useState([]);
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    getSetupDoctorGlobalShift();
    getSetupShift();
  }, []);

  const getSetupShift = async () => {
    const response = await api.getSetupApptShift();
    const { data } = response;
    console.log(data,"getting");
    setShifts(data);
  };

  const getSetupDoctorGlobalShift = async () => {
    try {
      const response = await api.getSetupApptGlobalShift();
      const { data } = response;
      console.log(data,"resp");
      setRowData(data);
    } catch (error) {
      console.error("Error fetching global shifts:", error);
    }
  };

  const handleCheckboxChange = async (staffId, shiftId) => {
    console.log("calling");
    try {
      console.log(staffId,shiftId,"both getting");
      // Find the doctor in the rowData array
      const updatedRowData = rowData.map((item) =>
        item.staff_id === staffId
          ? { ...item, global_shift_id: shiftId }
          : item
      );

      setRowData(updatedRowData);

      // Call the API to update the global_shift_id for the specific staff
    const response =   await api.updateSetupApptGlobalShift(staffId, shiftId);
    console.log(response.data,"edeeed");
    } catch (error) {
      console.error("Error updating global shifts:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Doctor shift</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
              <table>
                <thead>
                  <tr>
                    <th>Doctor Name</th>
                    {shifts.map((shift) => (
                      <th key={shift.id}>{shift.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowData.map((item) => (
                    <tr key={item.staff_id}>
                      <td>{item.doctor_name}</td>
                      {shifts.map((shift) => (
                        <td key={shift.id}>
                          <input
                            key={item.global_shift_id}
                            checked={item.global_shift_id === shift.id}
                            onChange={() => handleCheckboxChange(item.staff_id, shift.id)}
                            type="checkbox"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                {/* <button className="btn btn-primary" onClick={handleSaveChanges}>
                  Save Changes
                </button> */}
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Setupdoctorshift);
