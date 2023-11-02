import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";
import AlertDialog from "./IncomeDialog";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { style } from "@mui/system";
import { useEffect } from "react";
import api from "services/Api";
import { useState } from "react";

//redux

const Income = props => {

  const [open, setOpen] = React.useState(false);
  const [data,setData] = useState([])
  const [searchData,setSearchData] = useState('')
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(()=>{
   getIncome()
  },[])
  const getIncome =async () =>{
   const response = await api.getFinanceModuleIncome()
   const {data} = response
   setData(data)
   console.log(data,"d")
  }

  const handleClose = () => {
    setOpen(false);
  };

  

  const columnDefs = [

    { headerName: "Name", field: "name", cellStyle: { color: 'blue', fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.1)' } },
    {
      headerName: "Invoice No",
      field: "invoice_no",
      filter: "agSetColumnFilter",
    },
    { headerName: "Date", field: "date" },
    { headerName: "Description", field: "note" },
    { headerName: "Income head", field: "income_category"},
    { headerName: "Amount", field: "amount" },

  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );
  const handleChange = (e) =>{
    const {value} = e.target
    setSearchData(value)
  }
  const onSubmit =async () =>{
    const response = await api.getFinanceModuleIncome(searchData)
    const {data} = response
    setData(data)
    console.log(data)
    }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Income")}
            breadcrumbItem={props.t("Income")}
          /><div>

<input style={{width:'10%'} } onChange={handleChange}></input><button onClick={()=>onSubmit()} className="btn btn-primary bg-soft"  style={{width:'7%'}}>search</button>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}><button className='btn btn-primary' variant="outlined" onClick={handleClickOpen}>
            ₹ &nbsp;Add Income
          </button></div>
          <AlertDialog 
            open={open}
            handleClose={handleClose}
          />
        </Container>
        <div
          className="ag-theme-balham"
          style={{ height: 500, marginTop: "20px" }}
        >
          <AgGridReact
            rowData={data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </React.Fragment>
  );
};


export default withTranslation()(Income);