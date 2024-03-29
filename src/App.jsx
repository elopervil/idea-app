import { useContext } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

import { AuthContext } from "./context/authContext";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import TimeLine from "./pages/TimeLine";
import ProfileUser from "./pages/ProfileUser";
import { Profile } from "./pages/Profile";
import PasswordRecovery from "./pages/PasswordRecovery";

function App() {
  const context = useContext(AuthContext);

  return (
    <div className="App">
      {!context.user ? <Header /> : ""}
      <Routes>
        <Route path="/" element={<PublicRoutes />}>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/login" element={<LoginPage />} exact />
          <Route path="/register" element={<RegisterPage />} exact />
          <Route
            path="/passwordrecovery"
            element={<PasswordRecovery />}
            exact
          />
        </Route>
        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} exact>
            <Route index element={<TimeLine />} exact />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/profile/:slug" element={<ProfileUser />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
