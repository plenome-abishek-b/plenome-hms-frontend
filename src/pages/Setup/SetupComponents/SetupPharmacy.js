import PropTypes from "prop-types"
import React ,{useMemo, useState, useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupMedicineCategory from "../SetupDialog/SetupMedicineCategoryDialog"
import api from "services/Api"
//redux

const SetupPharmacy = props => {
  const initialMedCategoryValue = {
    medicine_category: '',
    created_at: '2023-06-07 11:11:11'
  }

    const [openSetupMedicineCategory, setOpenSetupMedicineCategory] = useState()
    const [tableData, setTableData] = useState();
    const [formData, setFormData] = useState(initialMedCategoryValue);

  const columnDefs = [
    {headerName: 'Category Name', field: 'medicine_category'},
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const onChange = (e) => {
    console.log(e.target.value,"lllll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

   

  const handleOpenMedicineCategory = () => {
    setOpenSetupMedicineCategory(true);
  }

  const handleCloseMedicineCategory = () => {
    setOpenSetupMedicineCategory(false);
  }

  useEffect(() => {
    // getUsers from json
    getChrgCategory()
  }, [])

  const getChrgCategory = () => {
    api.getPharmacyCtgry().then(res => setTableData(res.data))
    api.http
  }

  function handleFormSubmit() {
    //for posting and getting data at a sametime
    api.postPharmacyCtgry(formData).then(resp => {
      console.log(resp)
    })
    handleClose()

    api
      .getPharmacyCtgry({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getChrgCategory()
        setFormData(initialMedCategoryValue)
        preventDefault()
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Medicine Category List</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary bg-soft" onClick={handleOpenMedicineCategory}><i className="fa fa-plus"></i>&nbsp; Add Medicine Category</button>
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
                <SetupMedicineCategory open={openSetupMedicineCategory} handleClose={handleCloseMedicineCategory} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupPharmacy)
