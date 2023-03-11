import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const GET_USERS = gql`
  query {
    users {
      username
      email
      id
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_USERS);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/login" element={<LoginPage />} exact />
        <Route path="/register" element={<RegisterPage />} exact />
      </Routes>
    </div>
  );
}

export default App;
