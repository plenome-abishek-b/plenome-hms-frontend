import PropTypes from "prop-types";
import React, { useMemo, useState, useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import SetupChargeDialog from "../SetupDialog/SetupChargeDialog";
import api from "services/Api";
//redux

const setupCharges = (props) => {
  const initialChargeValue = {
    name: "",
    charge_category_id: "",
    charge_unit_id: "1",
    tax_category_id: "",
    standard_charge: "",
    date: "",
    status: "ok",
    Hospital_id: "1",
    description: "",
    created_at: "2024-04-04 11:11:11"
  };

  const [openCharge, setOpenCharge] = useState();
  const [tableData, setTableData] = useState(null);
  const [formData, setFormData] = useState(initialChargeValue);
  const [updateTaxCategory, setUpdateTaxCategory] = useState({});

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Charge Category", field: "charge_category" },
    { headerName: "Charge Type", field: "charge_type" },
    { headerName: "Unit", field: "unit" },
    {
      headerName: "Tax(%)",
      field: "tax",
      valueFormatter: (params) => `${params.value.toFixed(2)}%`, // format with two decimal places
    },
    { headerName: "Standard Charges(₹)", field: "standard_charge" },
    {
      headerName: "Total(₹)",
      field: "total",
      valueGetter: (params) => {
        const standardCharge = params.data.standard_charge || 0;
        const tax = params.data.tax || 0;
        const total = (1 + tax / 100) * standardCharge;
        return total.toFixed(2);
      },
    }
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  const onChange = (e) => {
    //catch the parameters when changed.
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  console.log(formData,'data coming');

  const handleOpenCharge = () => {
    setOpenCharge(true);
  };

  const handleCloseCharge = () => {
    setOpenCharge(false);
  };

  useEffect(() => {
    // getUsers from json
    getSetupcharges();
  }, []);

  const getSetupcharges = () => {
    api.getCharges().then((res) => setTableData(res.data));
    api.http;
  };

  function handleFormSubmit(formData, handleClose, updateTaxCategorys) {
    // Extract tax_category_id from updateTaxCategorys
    const taxCategoryId = updateTaxCategorys.tax_category_id;
  
    // Include tax_category_id in the postData
    const postData = {
      ...formData,
      standard_charge: formData.standard_charge,
      tax_category_id: taxCategoryId,
      // ... other fields ...
    };
  
    console.log(updateTaxCategorys, "vandachhh singam");
    console.log(updateTaxCategory, "upddddaa");
    console.log(postData, "form coming");
  
    api.postCharges(postData).then((resp) => {
      console.log(resp, 'charges resp');
      getSetupcharges();
      setFormData(initialChargeValue);
      handleClose();
    });
  }
  
  
  console.log(formData,'after posted')

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Charges Details</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-mod bg-soft" onClick={handleOpenCharge}>
                  <i className="fa fa-plus"></i>&nbsp; Add Charges
                </button>
              </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={tableData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                />
                <SetupChargeDialog
                  open={openCharge}
                  handleClose={handleCloseCharge}
                  data={formData}
                  onChange={onChange}
                  handleFormSubmit={handleFormSubmit}
                  updateTaxCategorys = {setUpdateTaxCategory}
                />
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(setupCharges);
