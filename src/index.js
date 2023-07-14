import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider as ReduxProvider } from 'react-redux';
import { store }from "./redux/store";
import { HelmetProvider } from "react-helmet-async";
import SettingsProvider from "./contexts/SettingsContext";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <SettingsProvider>
      <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>,
      </SettingsProvider>
      </ReduxProvider>

  </React.StrictMode>
);

