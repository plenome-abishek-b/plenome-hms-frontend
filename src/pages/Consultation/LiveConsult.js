import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux

const Liveconsult = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Live Consultation")}
            breadcrumbItem={props.t("Live Consultation")}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Liveconsult);