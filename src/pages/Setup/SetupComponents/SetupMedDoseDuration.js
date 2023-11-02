import PropTypes from "prop-types"
import React ,{useMemo, useState, useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

import SetupMedDoseDurationDialog from "../SetupDialog/SetupMedDoseDurationDialog"
import api from "services/Api"

const SetupDoseDuration = props => {

  const initialDosedurationValue = {
    name: '',
    created_at: '2023-08-09 11:11:11'
  }

    const [openMedDosedurationDialog, setOpenMedDosedurationDialog] = useState();
    const [formData, setFormData] = useState(initialDosedurationValue)
    const [tableData, setTableData] = useState()

  const columnDefs = [
    {headerName: 'Duration', field: 'name'},
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const handleOpenMedDoseDuration = () => {
    setOpenMedDosedurationDialog(true);
  }

  const handleCloseMedDoseDuration = () => {
    setOpenMedDosedurationDialog(false);
  }

  const onChange = (e) => {
    console.log(e.target.value,"lllll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  useEffect(() => {
    // getUsers from json
    getDoseDuration()
  }, [])

  const getDoseDuration = () => {
    api.getDosageDuration().then(res => setTableData(res.data))
    api.http
  }

  function handleFormSubmit() {
    //for posting and getting data at a sametime
    api.postDosageDuration(formData).then(resp => {
      console.log(resp)
    })
    handleClose()

    api
      .getDosageDuration({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getDoseDuration()
        setFormData(initialDosedurationValue)
        preventDefault()
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Medicine Dosage Duration</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary bg-soft" onClick={handleOpenMedDoseDuration}><i className="fa fa-plus"></i>&nbsp; Add Dosage Duration</button>
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
                <SetupMedDoseDurationDialog open={openMedDosedurationDialog} handleClose={handleCloseMedDoseDuration} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupDoseDuration)
