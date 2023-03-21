import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-ocj0rgmusw7m0hn7.us.auth0.com"
    clientId="mgk0p6e55acecEtkWUG8JeSeVNetQlrS"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);