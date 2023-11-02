import React, { Fragment } from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"
import { useEffect } from 'react'
import api from 'services/Api'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { Container } from 'reactstrap'

function dischargedPatient() {
const [chargeData,setChargeData] = useState([])
// const rowData = [
//     {name: 'adarsh', pid:'1', case_id: '1', gender: 'male', contact: '738473849',cons: 'raju',date: '22-08-2023',ddate: '25-08-2023',tax: '10%', total: '25000'}
// ]    
  

      const columnDefs = [
        { headerName: 'Name', field: 'patient_name' },
        {headerName: 'Patient ID', field: 'patient_id'},
        {headerName: 'Case ID', field: 'case_reference_id'},
        {headerName: 'Gender', field: 'gender'},
        {headerName: 'Phone', field: 'mobileno'},
        {headerName: 'Consultant', field:'name'},
        {headerName: 'Admission Date', field: 'date'},
        {headerName: 'Discharged Date', field: 'discharge_date'},
        // {headerName: 'Tax', field: 'tax'},
        // {headerName: 'Net Amount', field: 'amt'},
        // {headerName: 'Total', field: 'total'}
      
      ];
      useEffect(()=>{
        getDischargedPatient()
      },[])
      const getDischargedPatient = async () =>{
        const response = await api.getDischargePatients()
        const {data} = response
        setChargeData(data)
        console.log(data,"ffffdata")
      }
    
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
          <h4>Discharged Patient List</h4>
          <div
            className="ag-theme-balham"
            style={{ height: 500, marginTop: "100px" }}
          >
            <AgGridReact
              rowData={chargeData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
          
        </Container>
      </div>
    </React.Fragment>
    
    
        
  )
}

export default dischargedPatient