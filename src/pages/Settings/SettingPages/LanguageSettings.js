import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "reactstrap";
import "./Language.css"

const Languagesettings = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>{t("Language Settings")}</h4>
          <div className="language-row mt-3">
            <div className="language-name fs-4 fw-bold">English</div>
            <button onClick={() => changeLanguage("en")} className="btn btn-success">
              Enable
            </button>
          </div>
          <hr style={{width: '100%', height: '1px'}}/>
          <div className="language-row">
            <div className="language-name fs-4 fw-bold">Spanish</div>
            <button onClick={() => changeLanguage("es")} className="btn btn-success">
              Enable
            </button>
          </div>
          <hr style={{width: '100%', height: '1px'}}/>
          <div className="language-row">
            <div className="language-name fs-4 fw-bold">Tamil</div>
            <button onClick={() => changeLanguage("tm")} className="btn btn-success">
              Enable
            </button>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Languagesettings;
