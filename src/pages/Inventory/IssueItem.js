import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo , useEffect , useState } from "react";
import IssueItemDialog from "./IssueItemDialog";
import { Link } from "react-router-dom";
import api from "services/Api";

//redux

const IssueItem = props => {

  const initialInventoryItemIssueValue = {
    issue_type: "",
    issue_to: "",
    issue_by: "",
    issue_date: "",
    return_date: "",
    item_category_id: "1",
    item_id: "1",
    quantity: "",
    note: "",
    is_returned: "1",
    is_active: "no",
    created_at: "2023-02-02 11:11:11"
  } 

  const [openIssueItem, setOpenIssueItem] = React.useState(false);
  const [tableData,setTableData] = useState()
  const [formData,setFormData] = useState(initialInventoryItemIssueValue)

  const handleOpenIssue = () => {
    setOpenIssueItem(true);
  };

  const handleCloseIssue = () => {
    setOpenIssueItem(false);
  };


  // const rowData = [
  //   {item: '',
  //   category: '',
  //   return: '',
  //   issueto: '',
  //   issueby: '',
  //   qty: '',
  //   status: ''}

  // ];

  const columnDefs = [
    { headerName: 'Item', field: 'item_name' },
    { headerName: 'Item Category', field: 'item_category' },
    { headerName: 'Issue Date', field: 'issue_date' },
    { headerName: 'Return Date', field: 'return_date' },
    { headerName: 'Issue To', field: 'name' },
    { headerName: 'Issued By', field: 'issue_by' },
    { headerName: 'Quantity', field: 'quantity' },
    { headerName: 'Status', field: 'is_returned' },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }

  useEffect(() => {
    // getUsers from json
    getInventItemIssue()
  }, [])

  const getInventItemIssue = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getInventoryItemIssue().then(res => {
      console.log(res,'response');
      setTableData(res.data)})
    
    api.http
  }

  function handleFormSubmit(event) {

    // const payload = {
    //   case_reference_id: "1",
    //   patient_id: id, // Assign the patient ID to the patient_id field
    //   generated_by: "1",
    //   is_ipd_moved: "no",
    //   discharged: "2023-04-25 14:07:22",
    //   created_at: ""
    // };
  
    api.postInventoryItemIssue(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });

  
    api
      .getInventoryItemIssue({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getInventItemIssue();
        setFormData(initialInventoryItemIssueValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <h4>Issue Item List</h4>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleOpenIssue}>Add Issue Item</button>
          </div>
          <IssueItemDialog 
            open={openIssueItem}
            handleClose={handleCloseIssue}
            data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit}
          />
           <div
          className="ag-theme-balham"
          style={{ height: 700, marginTop: "20px" }}
        >
          <AgGridReact
            rowData={tableData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
            domLayout='autoHeight'
          />
        </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(IssueItem);