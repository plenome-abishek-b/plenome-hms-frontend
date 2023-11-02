import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
    Container,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import CallDialog from "./CallDialog";
import api from "services/Api";

//redux

const CallLog = props => {

    const initialValue = {
        name: "",
        contact: "",
        date: "",
        description: "",
        follow_up_date: "",
        call_duration: "",
        note: "",
        call_type: "",
        created_at: ""
        }
    

    const [open, setOpen] = React.useState(false);
    const [tableData, setTableData] = useState(null)
    const [formData, setFormData] = useState(initialValue)

    console.log(formData,'formdata');

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    console.log(value, id,'selectttttt');
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
        { headerName: 'Phone', field: 'contact' },
        { headerName: 'Date', field: 'date' },
        { headerName: 'description', field: 'description' },
        { headerName: 'follow_up_date', field: 'follow_up_date' },
        { headerName: 'call_duration', field: 'call_duration' },
        { headerName: 'note', field: 'note' },
        { headerName: 'call_type', field: 'call_type' },
        { headerName: 'created_at', field: 'created_at' }
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
        getCallLogs()
      }, [])
    
      const getCallLogs = () => {
        api.getCallLog().then(res => setTableData(res.data))
        api.http
      }
    
      function handleFormSubmit() {
        //for posting and getting data at a sametime
        api.postCallLog(formData).then(resp => {
          console.log(resp)
          console.log(resp.data,'hjhiii')
        })
        handleClose()
    
        api
          .getCallLog({ headers: { "content-type": "application/json" } })
          .then(resp => {
            getCallLogs()
            setFormData(initialValue)
            preventDefault()
          })
      }
    

    //meta title
    //   document.title = "Dashboard | Skote - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                   
                    <Breadcrumbs
                        title={props.t("Call logs")}
                        breadcrumbItem={props.t("Calls")}
                    />
                    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                        <button className="btn btn-primary" onClick={handleClickOpen}>+ Add Call log</button>
                    </div>
                    <CallDialog 
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

export default withTranslation()(CallLog);