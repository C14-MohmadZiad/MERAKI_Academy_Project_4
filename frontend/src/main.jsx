import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//import Browser
import { BrowserRouter } from "react-router-dom";
//import the provider
import { Provider } from "react-redux";
//import the store
import store from "./redux/store.js";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
