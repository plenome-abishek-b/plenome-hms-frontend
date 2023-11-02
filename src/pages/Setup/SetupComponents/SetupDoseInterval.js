import PropTypes from "prop-types"
import React ,{useMemo, useState, useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupMedDoseIntervalDialog from "../SetupDialog/SetupMedDoseInterval"
import api from "services/Api"
//redux

const SetupDoseInterval = props => {

  const initialDoseintervalValue = {
    name: '',
    created_at: '2023-05-25 15:06:55'
  }

const [openMedDoseIntervalDialog,setOpenMedDoseIntervalDialog] = useState()
const [formData, setFormData] = useState(initialDoseintervalValue);
const [tableData, setTableData] = useState();

  const columnDefs = [
    {headerName: 'Interval', field: 'name'},
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const handleOpenMedDoseInterval = () => {
    setOpenMedDoseIntervalDialog(true);
  }

  const handleCloseMedDoseInterval = () => {
    setOpenMedDoseIntervalDialog(false);
  }

  const onChange = (e) => {
    console.log(e.target.value,"lllll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  useEffect(() => {
    // getUsers from json
    getDoseInterval()
  }, [])

  const getDoseInterval = () => {
    api.getDosageInterval().then(res => setTableData(res.data))
    api.http
  }

  function handleFormSubmit() {
    //for posting and getting data at a sametime
    api.postDosageInterval(formData).then(resp => {
      console.log(resp)
    })
    handleClose()

    api
      .getDosageInterval({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getDoseInterval()
        setFormData(initialDoseintervalValue)
        preventDefault()
      })
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Dosage Interval List</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary bg-soft" onClick={handleOpenMedDoseInterval}><i className="fa fa-plus"></i>&nbsp; Add Dosage Interval</button>
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

                <SetupMedDoseIntervalDialog open={openMedDoseIntervalDialog} handleClose={handleCloseMedDoseInterval} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupDoseInterval)
