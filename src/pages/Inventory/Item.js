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
import { useMemo , useState , useEffect} from "react";
import ItemDialog from "./ItemDialog";
import api from "services/Api";

//redux

const Item = props => {


    const initialInventoryItemValue = {
        item_category_id: "1",
        name: "",
        unit: "",
        item_photo: "photo",
        description: "",
        quantity: "100",
        date: "2023-02-02",
        created_at: "2023-02-02 11:11:11"
      } 

    const [open, setOpen] = React.useState(false);
    const [tableData,setTableData] = useState()
    const [formData,setFormData] = useState(initialInventoryItemValue)

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    // const rowData = [
    //     { item: 'Surgical Lights', category: 'Equipments', unit: '100', desc: '	A surgical light which is also called as an operating light is a medical equipment which helps medical personnel during a surgery by illuminating on a local area of the patient.', qty: '20' }
    // ];

    const columnDefs = [
        { headerName: 'Item', field: 'name' },
        { headerName: 'Category', field: 'item_category' },
        { headerName: 'Unit', field: 'unit' },
        { headerName: 'Description', field: 'description'},
        { headerName: 'Quantity', field: 'remainingQuantity' }
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
        getInventItem()
      }, [])
    
      const getInventItem = () => {
        
        // api.getPatient().then(res => setTableData(res.data))
        api.getInventoryItem().then(res => {
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
      
        api.postInventoryItem(formData).then(resp => {
          console.log(resp);
          console.log(resp.data, 'patient');
        });

      
        api
          .getInventoryItem({ headers: { "content-type": "application/json" } })
          .then(resp => {
            getInventItem();
            setFormData(initialInventoryItemValue);
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
                        title={props.t("Items")}
                        breadcrumbItem={props.t("Item List")}
                    />
                    <div style={{display : 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                        <button className="btn btn-outline-primary" onClick={handleClickOpen}><i className="fas fa-cart-plus"></i>&nbsp; Add Item</button>
                    </div>
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
                    <ItemDialog 
                        open={open}
                        handleClose={handleClose}
                        data={formData}
                        onChange={onChange}
                        handleFormSubmit={handleFormSubmit}
                    />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default withTranslation()(Item);