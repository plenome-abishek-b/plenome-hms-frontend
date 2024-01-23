import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import api from "services/Api"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import VisitorDialog from "./visitorDialog";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

//redux

const Frontoffice = props => {

  const initialValue = {
    name: "",
    purpose: "",
    id_proof: "",
    date: "",
    in_time: "",
    out_time: "",
    note: "",
    phone: "",
    related_to: "",
    visit_to: "",
    no_of_pepple: "",
    contact: "",
    image: "",
    created_at: "2021-12-01 11:11:11"
    }

  const [open, setOpen] = React.useState(false);

  const [tableData, setTableData] = useState(null)

  const [formData, setFormData] = useState(initialValue)

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState('');



  const columnDefs = [
    { headerName: 'Purpose', field: 'purpose' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Visit To', field: 'visit_to' },
    { headerName: 'IPD/OPD/Staff', field: 'related_to' },
    { headerName: 'Phone', field: 'contact' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'In Time', field: 'in_time' },
    { headerName: 'Out Time', field: 'out_time' },
    {headerName: 'Visit to', field: 'visit_to'},
    {headerName: 'Note', field: 'note'},
    {headerName: 'ID Card', field: 'id_proof'},
    {headerName: 'Number of Persons', field: 'no_of_pepple'}
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  useEffect(() => {
    // getUsers from json
    getVisitors()
  }, [])

  const getVisitors = () => {
    api.getVisitor().then(res => setTableData(res.data))
    api.http
  }
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === '/complain') {
      history.push('/frontoffice/postal-recive'); // Navigate to the /complain page
    }
    if(selectedValue === '/dispatch'){
      history.push('/frontoffice/postal-dispatch')
    }
  };

  function handleFormSubmit() {
    //for posting and getting data at a sametime
    api.postVisitor(formData).then(resp => {
      console.log(resp)
      console.log(resp.data,'hjhiii')
    })
    handleClose()

    api
      .getVisitor({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getVisitors()
        setFormData(initialValue)
        preventDefault()
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Front Office")}
            breadcrumbItem={props.t("Front office")}
          />
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <button className="btn btn-success" style={{marginRight: '10px'}} onClick={handleClickOpen}>Add Visitor</button>
            <Link to='/calls'><button className="btn btn-outline-primary" style={{marginRight: '10px'}}><i className="fas fa-align-justify"></i>&nbsp; Phone-call log</button></Link>
            <select
      style={{ marginRight: '10px', height: '35px', border: '1px solid gray', borderRadius: '5px', width: '120px' }}
      value={selectedOption}
      onChange={handleOptionChange}
    >
      <option value="" className="btn btn-outline-secondary">select</option>
      <option value="/complain">Receive</option>
      <option value="/dispatch">Dispatch</option>
    </select>

            <Link to='/complain'><button className="btn btn-danger" style={{marginRight: '10px'}}>Complain</button></Link>
          </div>
          <VisitorDialog 
            open={open}
            handleClose={handleClose}
            data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit}
          />
          <div className="ag-theme-alpine"
            style={{ height: 500, marginTop: "20px" }}>
            <AgGridReact
              rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Frontoffice);