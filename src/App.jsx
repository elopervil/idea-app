import { useContext, useState, useEffect } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import { CircularProgress, AbsoluteCenter, Heading } from "@chakra-ui/react";
import { AuthContext } from "./context/authContext";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import TimeLine from "./pages/TimeLine";
import Profile from "./pages/Profile";

/*const GET_USERS = gql`
  query {
    users {
      username
      email
      id
    }
  }
`;*/

function App() {
  const context = useContext(AuthContext);

  /*const { loading, error, data } = useQuery(GET_USERS);
  console.log(data);
  if (loading)
    return (
      <AbsoluteCenter>
        <CircularProgress isIndeterminate color="gray.900" size="120px" />;
        <Heading as="h3" size="lg">
          Loading...
        </Heading>
      </AbsoluteCenter>
    );
  if (error) return <p>Error: {error.message}</p>;*/

  return (
    <div className="App">
      {!context.user ? <Header /> : ""}
      <Routes>
        <Route path="/" element={<PublicRoutes />}>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/login" element={<LoginPage />} exact />
          <Route path="/register" element={<RegisterPage />} exact />
        </Route>
        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} exact>
            <Route index element={<TimeLine />} exact />
            <Route path="/dashboard/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
