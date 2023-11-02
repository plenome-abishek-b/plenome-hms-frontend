import PropTypes from "prop-types"
import React ,{useMemo, useState, useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import RadiologyCategoryDialog from "../SetupDialog/SetupRadiologyDialog"
import api from "services/Api"
//redux

const Setupradilogy = props => {


    const [openSetupMedicineCategory, setOpenSetupMedicineCategory] = useState()
    const [tableData, setTableData] = useState();
    const [data,setData] = useState([])

  const columnDefs = [
    {headerName: 'Category Name', field: 'lab_name'},
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )


   

  const handleOpenMedicineCategory = () => {
    setOpenSetupMedicineCategory(true);
  }

  const handleCloseMedicineCategory = () => {
    setOpenSetupMedicineCategory(false);
  }

  useEffect(() => {
    // getUsers from json
    getRadiologyCategory()
  }, [])

 const getRadiologyCategory = async () =>{
    const response = await api.getRadiologyCategorys()
    const {data} = response
    setData(data)
    console.log(data,"data we")
 }

  // function handleFormSubmit() {
  //   //for posting and getting data at a sametime
  //   api.postPharmacyCtgry(formData).then(resp => {
  //     console.log(resp)
  //   })
  //   handleClose()

  //   api
  //     .getPharmacyCtgry({ headers: { "content-type": "application/json" } })
  //     .then(resp => {
  //       getChrgCategory()
  //       setFormData(initialMedCategoryValue)
  //       preventDefault()
  //     })
  // }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Radiology category list</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary bg-soft" onClick={handleOpenMedicineCategory}><i className="fa fa-plus"></i>&nbsp; Add Radiology Category</button>
            </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={data}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                />
                <RadiologyCategoryDialog open={openSetupMedicineCategory} handleClose={handleCloseMedicineCategory} />
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Setupradilogy)
