import React,{useState, useEffect, useCallback} from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import AlertDialog from "./MedicineDialog";
import 'ag-grid-enterprise';
import { Link } from "react-router-dom";
import api from "services/Api";

//i18n
import { withTranslation } from "react-i18next";

//redux

const Medicines = props => {

    const initialMedicineValue = {
        medicine_name: '',
        medicine_category_id: '1',
        medicine_image: '',
        medicine_company: '',
        medicine_composition: '',
        medicine_group: '',
        unit: '',
        min_level: 'ere',
        reorder_level: 'ere',
        vat: '5',
        unit_packing: '2',
        vat_ac: '2',
        note: 'sdfsf',
        is_active: '1',
        created_at: '2023-01-01 11:11:11',
        medicine_category: 'tablet'
        }

    const [open, setOpen] = React.useState(false);
    const [tableData, setTableData] = useState(null)
    const [formData, setFormData] = useState(initialMedicineValue);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChange = (e) => {
        console.log(e.target.value,"lllll")
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value });
      };

    const columnDefs = [
        { headerName: 'Medicine name', field: 'medicine_name', cellStyle: { fontWeight: 'bold', backgroundColor: '#EEEEEE' } },
        { headerName: 'Medicine Category', field: 'medicine_category' },
        { headerName: 'Medicine Composition', field: 'medicine_composition' },
        { headerName: 'Medicine Company', field: 'medicine_company' },
        { headerName: 'Medicine Group', field: 'medicine_group' },
        { headerName: 'Unit', field: 'unit' },
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
        getPharmacyMedicines()
      }, [])
    
      const getPharmacyMedicines = () => {
        api.getPharmacyMeds().then(res => setTableData(res.data))
        api.http
      }
    
      function handleFormSubmit() {
        api.postPharmacyMeds(formData).then(resp => {
          console.log(resp)
        })
       
    
        api
          .getPharmacyMeds({ headers: { "content-type": "application/json" } })
          .then(resp => {
            getPharmacyMedicines()
            setFormData(initialMedicineValue)
            preventDefault()
          })
          handleClose()
      }
    
      const onGridReady = useCallback(params => {
        api
          .getPharmacyMeds()
          .then(resp => resp.data())
          .then(data => {
            setRowData(data)
          })
      }, [])


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <h3>Medicines Stock</h3>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Link to='/medicinepage'><button className='btn btn-primary' style={{marginRight: '10px'}}><i className="fas fa-download"></i> Import Medicine</button></Link>
                    <button className='btn btn-primary' variant="outlined" onClick={handleClickOpen} style={{marginRight: '10px'}}>
                        <i className="fas fa-capsules"></i>  Add Medicine
                    </button>
                    <Link to='/medicinepurchase'><button className='btn btn-primary'>Purchase</button></Link>
                    </div>

                    <AlertDialog
                        open={open}
                        handleClose={handleClose}
                        data={formData}
                        onChange={onChange}
                        handleFormSubmit={handleFormSubmit}
                    />
                </Container>
                <div className="ag-theme-alpine"
                    style={{ height: 500, marginTop: "20px" }}>
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

export default withTranslation()(Medicines);