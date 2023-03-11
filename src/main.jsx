import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./ApolloClient";
import { AuthProvider } from "./context/authContext";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <Router>
        <ChakraProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ChakraProvider>
      </Router>
    </ApolloProvider>
  </AuthProvider>
);
