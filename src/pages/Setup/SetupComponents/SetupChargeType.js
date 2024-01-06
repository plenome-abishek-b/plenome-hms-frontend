import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { withTranslation } from "react-i18next";
import api from "services/Api";
import SetupChargeTypeDialog from "../SetupDialog/SetupChargeTypeDialog";
import "./chargetype.css";

const SetupChargeType = (props) => {
  const initialValue = {
    charge_type_id: "",
    is_default: "no",
    is_active: "yes",
    created_at: "2023-06-07 11:11:11",
  };

  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [formData, setFormData] = useState(initialValue);
  const [checkboxState, setCheckboxState] = useState({});

  const columnDefs = [
    { header: "Charge Type", field: "charge_type" },
    { header: "Appointment", field: "appointment" },
    { header: "OPD", field: "opd" },
    { header: "IPD", field: "ipd" },
    { header: "Pathology", field: "pathology" },
    { header: "Radiology", field: "radiology" },
    { header: "Blood Bank", field: "bloodbank" },
    { header: "Ambulance", field: "ambulance" },
  ];

  const onChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    chargeTypes();
  }, []);

  const chargeTypes = () => {
    api.getChargeType().then((res) => setTableData(res.data));
  };

  const handleFormSubmit = () => {
    api.postSetupChargeType(formData).then((resp) => {
      console.log(resp);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });

    api.getChargeType({ headers: { "content-type": "application/json" } }).then((resp) => {
      chargeTypes();
      setFormData(initialValue);
    });
  };

  const handleCheckboxChange = (rowIndex, field) => {
    setCheckboxState((prevCheckboxState) => {
      const key = `${rowIndex}_${field}`;
      const newState = { ...prevCheckboxState, [key]: !prevCheckboxState[key] };
      return newState;
    });
  };

  useEffect(() => {
    const initialData = [
      { charge_type: "Type1", appointment: "yes", opd: "no", ipd: "yes" },
      { charge_type: "Type2", appointment: "no", opd: "yes", ipd: "no" },
    ];
    setTableData(initialData);
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Charge Type List</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-mod bg-soft" onClick={handleOpen}>
                  <i className="fa fa-plus"></i>&nbsp; Add Charge Type
                </button>
              </div>
              <SetupChargeTypeDialog
                open={open}
                handleClose={handleClose}
                onChange={onChange}
                handleFormSubmit={handleFormSubmit}
                data={formData}
              />
              <div style={{ marginTop: "20px" }}>
                <table className="table">
                  <thead>
                    <tr>
                      {columnDefs.map((column, index) => (
                        <th key={index}>{column.header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData &&
                      tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {columnDefs.map((column, columnIndex) => (
                            <td key={columnIndex}>
                              {columnIndex === 0 ? (
                                row[column.field]
                              ) : (
                                <input
                                  type="checkbox"
                                  checked={checkboxState[`${rowIndex}_${column.field}`]}
                                  onChange={() => handleCheckboxChange(rowIndex, column.field)}
                                />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

SetupChargeType.propTypes = {
  // Add your prop types here
};

export default withTranslation()(SetupChargeType);
