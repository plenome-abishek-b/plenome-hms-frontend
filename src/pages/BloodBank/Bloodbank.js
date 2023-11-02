import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

//redux

const Bloodbank = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Blood bank")}
            breadcrumbItem={props.t("Blood Bank")}
          />
          <div className="bloodbank">
            <div className="row">
              <div className="col-lg-1 col-md-1 col-sm-2" >
                <Link >
                  <div className="p-2 fw-bold fs-6 bg-secondary text-white">
                    B+
                  </div>
                </Link>
              </div>
              <div className="col-lg-1 col-md-1 col-sm-2">
                <Link>
                  <div className="p-2 fw-bold fs-6 bg-secondary text-white">
                    B-
                  </div>
                </Link>
              </div>
              <div className="col-lg-1 col-md-1 col-sm-2">
                <Link>
                  <div className="p-2 fw-bold fs-6 bg-secondary text-white">
                    O+
                  </div>
                </Link>
              </div>
              <div className="col-lg-1 col-md-1 col-sm-2">
                <Link>
                  <div className=" p-2 fw-bold fs-6 bg-secondary text-white">
                    O-
                  </div>
                </Link>
              </div>
              <div className="col-lg-1 col-md-1 col-sm-2">
                <Link>
                  <div className="p-2 fw-bold fs-6 bg-secondary text-white">
                    A+
                  </div>
                </Link>
              </div>
              <div className="col-lg-1 col-md-1 col-sm-2">
                <Link>
                  <div className="p-2 fw-bold fs-6 bg-secondary text-white">
                    A-
                  </div>
                </Link>
              </div>
              <div className="col-lg-1 col-md-1 col-sm-2">
                <Link>
                  <div className="p-2 fw-bold fs-6 bg-secondary text-white">
                    AB-
                  </div>
                </Link>
              </div>
              <div className="col-lg-1 col-md-1 col-sm-2">
                <Link>
                  <div className="p-2 fw-bold fs-6 bg-secondary text-white">
                    AB+
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Bloodbank);
