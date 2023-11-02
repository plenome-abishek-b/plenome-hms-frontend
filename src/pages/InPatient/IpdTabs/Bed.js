import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"
import { useEffect } from 'react'
import api from 'services/Api'

function Bed() {
      const [formData,setFormData] = useState([])
    
      const columnDefs = [
        { headerName: 'Bed Group', field: 'bed_group_name', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        { headerName: 'Bed', field: 'bed_name' },
        { headerName: 'From Date', field: 'date' },
        { headerName: 'To Date', field: 'discharge_date' },
        { headerName: 'Active Bed', field: 'abed', valueGetter: function(params) {
          const dischargeDate = params.data.discharge_date;
          return dischargeDate ? 'No' : 'Yes';
        } }
      ];
    useEffect(()=>{
    getBedhistoryData()
    },[])
    const getBedhistoryData = async ()=>{
      const response = await api.getBedHistory()
      const {data} = response
      console.log(data,"get bed history")
      setFormData(data)
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
            style={{ height: 800 }}>
            <AgGridReact
              rowData={formData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
  )
}

export default Bed