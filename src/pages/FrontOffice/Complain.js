import PropTypes from "prop-types";
import React from "react";
import {
    Container,
} from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo , useState, useEffect} from "react";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

import ComplainDialog from "./ComplainDialog";
import api from "services/Api";

//redux

const Complain = props => {

    const initialValue = {
        name: "",
        source: "",
        complaint_type: "",
        date: "",
        email: "",
        note: "",
        contact: "",
        description: "",
        action_taken: "",
        assigned: "",
        image: "",
        created_at: "",
        complaint_type_id: ""
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

    const columnDefs = [
        { headerName: 'Name', field: 'name' },
        { headerName: 'Complaint', field: 'complaint_type_id' },
        { headerName: 'Source', field: 'source' },
        { headerName: 'Phone', field: 'contact' },
        { headerName: 'Date', field: 'date' },
        
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
        getComplaints()
      }, [])
    
      const getComplaints = () => {
        api.getComplaint().then(res => setTableData(res.data))
        api.http
      }
    
      function handleFormSubmit() {
        //for posting and getting data at a sametime
        api.postComplaint(formData).then(resp => {
          console.log(resp)
          console.log(resp.data,'hjhiii')
        })
        handleClose()
    
        api
          .getComplaint({ headers: { "content-type": "application/json" } })
          .then(resp => {
            getComplaints()
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
                        title={props.t("Complain")}
                        breadcrumbItem={props.t("Complain Issue")}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <button className="btn btn-danger" onClick={handleClickOpen}>+ Add complain</button>
                    </div>
                    <ComplainDialog 
                        open={open}
                        handleClose={handleClose}
                        data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit}
                    />
                    <div
                        className="ag-theme-balham"
                        style={{ height: 500, marginTop: "20px" }}
                    >
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


export default withTranslation()(Complain);
