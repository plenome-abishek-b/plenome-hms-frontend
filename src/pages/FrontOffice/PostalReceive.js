import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
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
import ReceiveDialog from "./ReciveDialog";

//redux

const PostalReceive = props => {

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
    { headerName: 'From Title', field: 'from_title' },
    { headerName: 'Reference No', field: 'reference_no' },
    { headerName: 'To tytle', field: 'to_title' },
    { headerName: 'Address', field: 'address' },
    { headerName: 'Note', field: 'note' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Action', field: '' },
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
    Receivers()
  }, [])

 const Receivers =async ()=>{
   const response = await api.getFrontofficeReceiver()
   const {data} = response
   setTableData(data)
   console.log(data,"datw")
  }
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === '/complain') {
      history.push('/complain'); // Navigate to the /complain page
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
            title={props.t("Postal Receive list")}
            breadcrumbItem={props.t("Postal Receive list")}
          />
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <button className="btn btn-success" style={{marginRight: '10px'}} onClick={handleClickOpen}>Add Recive</button>
          </div>
          <ReceiveDialog
            open={open}
            handleClose={handleClose}
            data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit}
          />
          <div className="ag-theme-balham"
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

export default withTranslation()(PostalReceive);