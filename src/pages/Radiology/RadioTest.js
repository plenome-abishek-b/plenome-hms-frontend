import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import RadioDialog from "./RadioDialog";
import api from "services/Api";
import { useState } from "react";

//redux

const RadioTest = props => {

    const [open, setOpen] = React.useState(false);
    const [radiologyData,setRadiologyData] = useState()

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

 
    useEffect(()=>{
      getRadiologyTest()
    },[])
   const getRadiologyTest = async () =>{
    const response = await api.getRadiologyDetails()
    const {data} = response
    console.log(data,'radioooooo')
    setRadiologyData(data)
    console.log(data,"response of radiology test")
   }
    const columnDefs = [
        { headerName: 'Test Name', field: 'test_name' },
        { headerName: 'Short Name', field: 'short_name' },
        { headerName: 'Test Type', field: 'test_type' },
        { headerName: 'Category', field: 'lab_name' },
        { headerName: 'Report Days', field: 'report_days' },
        { headerName: 'Amount', field: 'standard_charge' },
    ];

    const defaultColDef = useMemo(
        () => ({
            sortable: true,
            filter: true,
            flex: 1,
        }),
        []
    );

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title={props.t("Radiology Test")}
                        breadcrumbItem={props.t("Radiology")}
                    />
                    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                        <button className="btn btn-outline-primary" onClick={handleClickOpen}>Add Radiology Test</button>
                    </div>
                    <div
                        className="ag-theme-alpine"
                        style={{ height: 500, marginTop: "20px" }}
                    >
                    <AgGridReact 
                        rowData={radiologyData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        pagination={true}
                        paginationPageSize={10}
                        domLayout='autoHeight'
                    />
                    </div>
                    <RadioDialog 
                        open={open}
                        handleClose={handleClose}
                    />
                </Container>
            </div>
        </React.Fragment>
    );
};


export default withTranslation()(RadioTest);