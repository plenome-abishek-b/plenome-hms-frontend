import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";



import store from "./store";
import store2 from "./store2/store"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
      // <Provider store={store2}>
    <Provider store={store}>
      <React.Fragment>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.Fragment>
      </Provider>
    //  </Provider>
);

serviceWorker.unregister()
