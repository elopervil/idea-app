import { Link } from "react-router-dom";
import { Button, Box, ButtonGroup } from "@chakra-ui/react";
const Header = () => {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="150px"
        bg="gray.900"
      >
        <ButtonGroup display="flex" flexWrap="wrap" justifyContent="center">
          <Link to="/login">
            <Button
              bg="gray.200"
              color="black"
              w="sm"
              mb="2"
              transition="all 0.8s"
              _hover={{
                bg: "gray.900",
                color: "white",
                border: "2px",
                borderColor: "gray.200",
              }}
            >
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button
              bg="gray.200"
              color="black"
              w="sm"
              transition="all 0.8s"
              _hover={{
                bg: "gray.900",
                color: "white",
                border: "2px",
                borderColor: "gray.200",
              }}
            >
              Register
            </Button>
          </Link>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default Header;
