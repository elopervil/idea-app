import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const ButtonLogout = () => {
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <Button variant="ghost" aria-label="Logout" my="" w="100%" onClick={logout}>
      Logout
    </Button>
  );
};

export default ButtonLogout;
