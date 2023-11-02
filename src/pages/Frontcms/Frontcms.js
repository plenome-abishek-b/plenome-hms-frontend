import PropTypes from "prop-types"
import React from "react"
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

//redux

const Frontcms = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Front CMS")}
            breadcrumbItem={props.t("CMS")}
          />
        </Container>
      </div>
    </React.Fragment>
  )
}


export default withTranslation()(Frontcms)