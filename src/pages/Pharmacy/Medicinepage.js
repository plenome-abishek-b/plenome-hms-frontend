import React, { useState, useCallback, useRef } from "react";
import { Container } from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { Row, Col } from "reactstrap";

// i18n
import { withTranslation } from "react-i18next";

// redux

const MedicinePage = (props) => {
  const gridRef = useRef();

  const [rowData, setRowData] = useState([]);

  const columnDefs = [
    { headerName: "Medicine", field: "medicine_name", cellStyle: { fontWeight: "bold", backgroundColor: "#EEEEEE" } },
    { headerName: "Company", field: "medicine_company" },
    { headerName: "Composition", field: "medicine_composition" },
    { headerName: "Group", field: "medicine_group" },
    { headerName: "Unit", field: "unit" },
    { headerName: "Min Level", field: "min_level" },
    { headerName: "Re-Order Level", field: "reorder_level" },
    { headerName: "VAT", field: "vat" },
    { headerName: "Unit/Packing Note", field: "unit_packing" },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  const onGridReady = (params) => {
    gridRef.current = params.api;
  };

  const onBtnExport = useCallback(() => {
    const params = {
      fileName: "sample_data.csv",
      allColumns: true,
      onlySelected: false,
      skipHeader: false,
      columnSeparator: ",",
      customHeader: "",
      customFooter: "",
    };

    gridRef.current.exportDataAsCsv(params);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target.result;
      const rows = contents.split("\n");

      // Assuming the CSV file has headers in the first row
      const headers = rows[0].split(",");
      const data = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(",");
        if (row.length === headers.length) {
          const rowData = {};
          for (let j = 0; j < headers.length; j++) {
            rowData[headers[j]] = row[j];
          }
          data.push(rowData);
        }
      }

      setRowData(data);
    };

    reader.readAsText(file);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h3>Medicines</h3>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <button className="btn btn-primary bg-soft" onClick={onBtnExport}>
              Download Sample Data
            </button>
          </div>
        </Container>
        <div className="ag-theme-alpine" style={{ height: 100, marginTop: "20px" }}>
          <AgGridReact rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} onGridReady={onGridReady} />
        </div>
        <div className="mt-3">
          <Row>
            <Col lg="5">
              <label>Medicine Category</label>
              <br />
              <select style={{ width: "100%", height: "30px" }}>
                <option>Select</option>
              </select>
            </Col>
            <Col>
              <label>Select CSV File</label>
              <br />
              <input type="file" onChange={handleFileChange} />
            </Col>
          </Row>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
          <button className="btn btn-primary bg-soft">
            <i className="fas fa-caret-up"></i> Import Medicines
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(MedicinePage);
