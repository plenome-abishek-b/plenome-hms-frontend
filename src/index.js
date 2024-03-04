import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';



import store from "./store";
import store2 from "./store2/store"

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'en',                              // language to use
  resources: {
    en: { translation: require('./locale/en.json') },
    es: { translation: require('./locale/es.json') },
    tm: {translation: require('./locale/tm.json')}
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
      // <Provider store={store2}>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
      <React.Fragment>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.Fragment>
      </I18nextProvider>
      </Provider>
    //  </Provider>
);

serviceWorker.unregister()
