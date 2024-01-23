import PropTypes from "prop-types"
import React from "react"
import { Card, CardBody, Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

//redux

const Abhacard = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Card>
            <CardBody>
                <h4>Download ABHA Card</h4>
            <button className="btn-mod">Download</button>
            </CardBody>
        </Card>
        
      </div>
    </React.Fragment>
  )
}


export default withTranslation()(Abhacard)