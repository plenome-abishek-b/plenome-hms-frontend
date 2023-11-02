import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"
import { useEffect } from 'react'
import api from 'services/Api'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

function Charges() {
const [chargeData,setChargeData] = useState([])
    
      const columnDefs = [
        { headerName: 'Date', field: 'date' },
        {headerName: 'Name', field: 'name'},
        {headerName: 'Charge Type', field: 'charge_type'},
        {headerName: 'Charge Category', field: 'category_name'},
        {headerName: 'Qty', field: 'qty'},
        {headerName: 'Standard Charge(₹)', field:'amount'}
      
      ];
      const {ipdno} = useParams()
    useEffect(()=>{
      getCharges()
    },[])
    const getCharges= async()=>{
    const response = await api.getIpdCharges(ipdno)
    const {data} = response
    setChargeData(data)
    console.log(data,"get chargessssssss")
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
    
        <div className="ag-theme-alpine mt-4"
            style={{ height: 600 }}>
            <AgGridReact
              rowData={chargeData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
  )
}

export default Charges