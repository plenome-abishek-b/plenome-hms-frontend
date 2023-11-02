import PropTypes from "prop-types"
import React ,{useMemo, useState, useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
//redux
import SetupMedDoseDialog from "../SetupDialog/SetupMedDoseDialog"
import api from "services/Api"

const SetupMedicineDosage = props => {

  const initialMedDosageValue = {
    medicine_category: '',
    dosage: '',
    created_at: '2023-05-23 11:11:11',
    medicine_category_id: '1',
    charge_units_id: '1'
  }

const [openMedDoseDialog,setOpenMedDoseDialog] = useState()

const [tableData, setTableData] = useState();
const [formData, setFormData] = useState(initialMedDosageValue);

  const columnDefs = [
    {headerName: 'Category Name', field: 'medicine_category'},
    {headerName: 'Dosage', field: 'dosage'},
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const handleOpenMedDose = () => {
    setOpenMedDoseDialog(true);
  }

  const handleCloseMedDose = () => {
    setOpenMedDoseDialog(false);
  }
  const [unit, setUnit] = useState('');

  const onChange = (e) => {
    const { value, id } = e.target;
  
    if (id === 'unit') {
      setUnit(value);
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };
  
  
  
  useEffect(() => {
    // getUsers from json
    getDosage()
  }, [])

  const getDosage = () => {
    api.getMedDosage().then(res => setTableData(res.data))
    api.http
  }

  function handleFormSubmit() {
    const { dosage } = formData;
    const dosageWithUnit = `${dosage} ${unit}`;
  
    const postData = {
      ...formData,
      dosage: dosageWithUnit,
    };
  
    //for posting and getting data at a sametime
    api.postMedDosage(postData).then(resp => {
      console.log(resp)
    })
    handleClose()

    api
      .getMedDosage({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getDosage()
        setFormData(initialMedDosageValue)
        preventDefault()
      })

  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Medicine Dosage List</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary bg-soft" onClick={handleOpenMedDose}><i className="fa fa-plus"></i>&nbsp; Add Medicine Dose</button>
            </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={tableData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                />
                <SetupMedDoseDialog open={openMedDoseDialog} handleClose={handleCloseMedDose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupMedicineDosage)
