import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo , useEffect , useState} from "react";
import InventoryDialog from "./InventoryDialog";
import { Link } from "react-router-dom";
import api from "services/Api";

//redux

const Inventory = props => {

  const initialInventoryItemStockValue = {
    item_id: "",
    supplier_id: "1",
    symbol: "+",
    store_id: "1",
    quantity: "",
    purchase_price: "",
    date: "",
    attachment: "",
    description: "",
    is_active: "yes",
    created_at: "2023-02-02 11:11:11"
  } 

  const [openStock, setOpenStock] = React.useState(false);
  const [tableData,setTableData] = useState()
  const [formData,setFormData] = useState(initialInventoryItemStockValue)

  const handleOpenStock = () => {
    setOpenStock(true);
  };

  const handleCloseStock = () => {
    setOpenStock(false);
  };


  // const rowData = [
  //   { name: 'Abishek', category: 'Bed sheets', supplier: 'VK agency', store: 'VK store', date: '05/01', desc: 'thin bedsheets', qty: '10', price: '500' },
  //   { name: 'Venkat', category: 'Bed sheets', supplier: 'VK agency', store: 'VK store', date: '05/01', desc: 'thin bedsheets', qty: '10', price: '500' }

  // ];

  const columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Category', field: 'item_category' },
    { headerName: 'Supplier', field: 'item_supplier' },
    { headerName: 'Store', field: 'item_store' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Quantity', field: 'quantity' },
    { headerName: 'Price', field: 'purchase_price' },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }

  useEffect(() => {
    // getUsers from json
    getInventItemStock()
  }, [])

  const getInventItemStock = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getInventoryItemStock().then(res => {
      console.log(res,'response');
      setTableData(res.data)})
    
    api.http
  }


  function handleFormSubmit(event) {

    // const payload = {
    //   case_reference_id: "1",
    //   patient_id: id, // Assign the patient ID to the patient_id field
    //   generated_by: "1",
    //   is_ipd_moved: "no",
    //   discharged: "2023-04-25 14:07:22",
    //   created_at: ""
    // };
  
    api.postInventoryItemStock(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });

  
    api
      .getInventoryItemStock({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getInventItemStock();
        setFormData(initialInventoryItemStockValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Inventory")}
            breadcrumbItem={props.t("Inventory")}
          />
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <button className="btn-mod" onClick={handleOpenStock}>Add Item Stock</button>
            <Link to="/inventory/issueitem"><button className="btn btn-success" style={{marginLeft: '10px'}}>Issue Item</button></Link>
            <Link to='/items'><button className="btn btn-secondary" style={{marginLeft: '10px'}}><i className="fas fa-align-justify"></i>&nbsp; Item</button></Link>
          </div>
          <InventoryDialog 
            open={openStock}
            handleClose={handleCloseStock}
            data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit}
          />
           <div
          className="ag-theme-alpine"
          style={{ height: 700, marginTop: "20px" }}
        >
          <AgGridReact
            rowData={tableData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
            domLayout='autoHeight'
          />
        </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Inventory);  