import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "reactstrap";
import "./Language.css"


const Languagesettings = () => {
  const [language,setLanguage] = useState({
    en: false,
    tm: false,
    es: false,
    ml: false,
    hn:false
  });

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    if(lng === "en"){
      setLanguage({...language,en:true,tm: false,es: false,ml: false,hn: false})
    }else if(lng === "tm"){
      setLanguage({...language,tm: true,en:false,es: false,ml: false,hn: false})
    }
  else if(lng === "ml"){
    setLanguage({...language,ml:true,tm: false,en:false,es: false,hn: false})
  }
  else if(lng === "hn"){
    setLanguage({...language,hn:true,ml:false,tm: false,en:false,es: false})
  }
    else{
      setLanguage({...language,es: true, en:false,tm: false,ml: false,hn: false})
    }
    i18n.changeLanguage(lng);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>{t("Language Settings")}</h4>
          <div className="language-row mt-3 p-3" style={{background: 'rgba(0,0,0,0.1)'}}>
            <div className="language-name fs-5 fw-bold">English</div>
            {language.en?(<button onClick={() => changeLanguage("en")} className="btn btn-danger btn-sm">
              Disable
            </button>):(<button onClick={() => changeLanguage("en")} className="btn btn-success btn-sm">
            Enable
            </button>)}
          </div>
          <hr style={{width: '100%', height: '1px', color: 'rgba(0,0,0,0.2)'}}/>
          {/* <div className="language-row p-3" style={{background: 'rgba(0,0,0,0.1)'}}>
            <div className="language-name fs-5 fw-bold">Spanish</div>
            {language.es?(<button onClick={() => changeLanguage("en")} className="btn btn-danger btn-sm">
              Disable
            </button>):(<button onClick={() => changeLanguage("es")} className="btn btn-success btn-sm">
              Enable
            </button>)}
          </div>
          <hr style={{width: '100%', height: '1px', color: 'rgba(0,0,0,0.2)'}}/> */}
          <div className="language-row p-3" style={{background: 'rgba(0,0,0,0.1)'}}>
            <div className="language-name fs-5 fw-bold">Tamil</div>
            {language.tm?(<button onClick={() => changeLanguage("en")} className="btn btn-danger btn-sm">
              Disable
            </button>):(<button onClick={() => changeLanguage("tm")} className="btn btn-success btn-sm">
              Enable
            </button>)}
          </div>
          <hr style={{width: '100%', height: '1px', color: 'rgba(0,0,0,0.2)'}}/>
          <div className="language-row p-3" style={{background: 'rgba(0,0,0,0.1)'}}>
            <div className="language-name fs-5 fw-bold">Malayalam</div>
            {language.ml?(<button onClick={() => changeLanguage("en")} className="btn btn-danger btn-sm">
              Disable
            </button>):(<button onClick={() => changeLanguage("ml")} className="btn btn-success btn-sm">
              Enable
            </button>)}
          </div>
          <hr style={{width: '100%', height: '1px', color: 'rgba(0,0,0,0.2)'}}/>
          <div className="language-row p-3" style={{background: 'rgba(0,0,0,0.1)'}}>
            <div className="language-name fs-5 fw-bold">Hindi</div>
            {language.hn?(<button onClick={() => changeLanguage("en")} className="btn btn-danger btn-sm">
              Disable
            </button>):(<button onClick={() => changeLanguage("hn")} className="btn btn-success btn-sm">
              Enable
            </button>)}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Languagesettings;
