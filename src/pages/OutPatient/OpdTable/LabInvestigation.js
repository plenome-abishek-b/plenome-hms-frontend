import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef , useEffect} from "react"
import api from 'services/Api'

function LabInvest() {

    // const rowData = [
    //     {tname: 'Chest X-rays',lab: 'Pathology', sample: 'Belina Turner', date: '12/04', approved: 'Abishek'}
    //   ];

    const [tableData,setTableData] = useState()
    
      const columnDefs = [
        { headerName: 'Test Name', field: 'test_name'},
        { headerName: 'Case ID', field: 'id'},
        // { headerName: 'Lab', field: 'lab_name' },
        { headerName: 'Sample Collected', field: 'name' },
        { headerName: 'Expected Date', field: 'reporting_date' },
        {headerName: 'Approved By', field: 'name'},
        // {headerName: 'Action', field: 'action'}
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
        getLab()
      }, [])
    
      const getLab = () => {
        
        // api.getPatient().then(res => setTableData(res.data))
        api.getLabInvest().then(res => {
          console.log(res,'response');
          setTableData(res.data)})
        
        api.http
      }
    

  return (
    
        <div className="ag-theme-alpine mt-1"
            style={{ height: 300 }}>
            <AgGridReact
              rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
  )
}

export default LabInvest