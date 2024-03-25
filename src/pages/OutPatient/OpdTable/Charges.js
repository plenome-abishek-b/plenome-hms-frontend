import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"
import { useEffect } from 'react'
import api from 'services/Api'
import { useParams } from 'react-router-dom/cjs/react-router-dom'


function Charges() {


  const rowData = [
    { name: '', ctype: '', scharge: '', tax: '', appchrg: '', amt: '' }
  ];
  const params = useParams()
  console.log(params,"parass")
  const columnDefs = [
    { headerName: 'Name', field: 'name', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
    { headerName: 'Charge Type', field: 'ctype' },
    { headerName: 'Standard Charge()', field: 'scharge' },
    { headerName: 'Tax', field: 'tax' },
    { headerName: 'Applied Charge()', field: 'appchrg' },
    { headerName: 'Amount()', field: 'amt' }
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

   useEffect(()=>{
    getCharges()
   },[])
   const getCharges = async () =>{
   const response = await api.getChargesAsperOPD()
   }





  return (


    <div className="ag-theme-alpine mt-4"
      style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        domLayout='autoHeight'
      />
    </div>

  )
}

export default Charges