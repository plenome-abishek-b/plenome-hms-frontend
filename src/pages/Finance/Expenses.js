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
import { useMemo } from "react";
import ExpenseDialog from "./ExpenseDialog";
import { useEffect } from "react";
import api from "services/Api";
import { useState } from "react";
//redux

const Expenses = props => {
  const [open, setOpen] = React.useState(false);
  const [rowData,setRowData] = useState([])
  const [searchData,setSearchData] = useState('')
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit =async () =>{
    const response = await api.getFinanceModuleExpenses(searchData)
    const {data} = response
    setRowData(data)
    console.log(data)
    }
    const handleChange = (e) =>{
      const {value} = e.target
      setSearchData(value)
    }

useEffect(()=>{
   getExpenses()
},[])
const getExpenses =async () =>{
  const response = await api.getFinanceModuleExpenses()
  const {data} = response
  setRowData(data)
  console.log(data,"expenses")
}

  const columnDefs = [
    
    { headerName: 'Invoice no.', field: 'invoice_no', cellStyle: {color: 'green', backgroundColor: '#EEEEEE', fontWeight: 'bold'} },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Description', field: 'note' },
    { headerName: 'Expense Head', field: 'exp_category' },
    { headerName: 'Amount', field: 'amount' },
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
            title={props.t("Expenses")}
            breadcrumbItem={props.t("Expenses")}
          />
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <button className="btn btn-primary" onClick={handleClickOpen}>Add Expense</button>
          </div>
          <div>
          <input style={{width:'10%'} } onChange={handleChange}></input><button onClick={()=>onSubmit()} className="btn btn-primary bg-soft"  style={{width:'7%'}}>search</button>
          </div>
            <ExpenseDialog 
              open={open}
              handleClose={handleClose}
            />
          <div
            className="ag-theme-balham"
            style={{ height: 500, marginTop: "20px" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
        
        </Container>

      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Expenses);