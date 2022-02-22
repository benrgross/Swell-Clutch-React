import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Auth0Provider
    domain="dev-p84nrz3p.us.auth0.com"
    clientId="FvVWy7JTqZIJBjPSo7k0I7q40NXxJP2D"
    redirectUri={window.location.origin}
    useRefreshTokens
    cacheLocation="localstorage"
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,

  document.getElementById("root")
);
