import PropTypes from "prop-types"
import React from "react"
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

//redux

const Aknowledgement = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Aknowledgement</h4>
        </Container>
      </div>
    </React.Fragment>
  )
}


export default withTranslation()(Aknowledgement)