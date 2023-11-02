import React,{useCallback, useRef, useState, useEffect } from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

//Import Breadcrumb
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import AlertDialog from "./MedicineDialog";
import 'ag-grid-enterprise';
import {Row, Col} from "reactstrap";
import api from "services/Api";
import SupplierbillDialog from "./Dialog/SupplierBill";
//i18n
import { withTranslation } from "react-i18next";

//redux

const MedicinePurchase = props => {
    const initialMedspurchaseValue = {
        invoice_no: '',
        date: '2023-05-06 18:11:11',
        file: '',
        total: '',
        tax: '',
        discount: '',
        net_amount: '',
        created_at: '2023-09-09 11:11:11',
        supplier_id: '1',
        received_by: '1'
    }
    
    const gridRef = useRef()

  const [tableData, setTableData] = useState(null)
  const [formData, setFormData] = useState(initialMedspurchaseValue);
  const [openSupplier, setOpenSupplier] = useState(false);

  const onChange = (e) => {
    console.log(e.target.value,"lllll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };


 const columnDefs = [
        { headerName: 'Pharmacy Purchase No', field: 'id',cellStyle: {color: 'blue', fontWeight: '500', backgroundColor: '#EEEEEE'},cellRenderer: (params) => {
    const id = params.data.id;
    return (
      <p>
        {"PHAB" + id}
      </p>
    );
  } },
        { headerName: 'Purchase Date', field: 'date' },
        { headerName: 'Bill No', field: 'invoice_no' },
        { headerName: 'Supplier Name', field: 'supplier' },
        { headerName: 'Total(₹)', field: 'total' },
        {headerName: 'Tax(₹)', field: 'tax'},
        {headerName: 'Discount(₹)', field: 'discount'},
        {headerName: 'Net Amount(₹)', field: 'net_amount'}
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
        getPharmacyPurchases()
      }, [])
    
      const getPharmacyPurchases = () => {
        api.getPharmacyPurchase().then(res => setTableData(res.data))
        api.http
      }
    
      function handleFormSubmit() {
        api.postPharmacyPurchase(formData).then(resp => {
          console.log(resp)
        })
       
    
        api
          .getPharmacyPurchase({ headers: { "content-type": "application/json" } })
          .then(resp => {
            getPharmacyPurchases()
            setFormData(initialMedspurchaseValue)
            preventDefault()
          })
          handleClose()
      }
    
      const onGridReady = useCallback(params => {
        api
          .getPharmacyPurchase()
          .then(resp => resp.data())
          .then(data => {
            setRowData(data)
          })
      }, [])

      const handleOpenSupplier = () => {
        setOpenSupplier(true);
      }

      const handleCloseSupplier = () => {
        setOpenSupplier(false);
      }


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <h3>Medicine Purchase List</h3>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <button className="btn btn-primary bg-soft" onClick={handleOpenSupplier}>+ Purchase Medicine</button>
                    <SupplierbillDialog open={openSupplier} handleClose={handleCloseSupplier} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
                    </div>
                </Container>
                <div className="ag-theme-alpine"
                    style={{ height: 200, marginTop: "20px" }}>
                    <AgGridReact
                        rowData={tableData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}   
                        />
                    </div>
            </div>


        </React.Fragment>
    );
};

export default withTranslation()(MedicinePurchase);