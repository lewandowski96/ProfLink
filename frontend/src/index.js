import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// project import
import { store } from './store';
 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <ReduxProvider store={store}>
      <App />
      </ReduxProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
