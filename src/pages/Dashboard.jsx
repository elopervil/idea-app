import { useQuery, gql } from "@apollo/client";
import { Heading, Flex, Image, IconButton, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import ButtonLogout from "../components/ButtonLogout";
import LoadingCircle from "../components/LoadingCircle";
import LinkButton from "../components/LinkButton";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";

const GET_USER_DATA = gql`
  query {
    me {
      id
      email
      username
      following {
        username
      }
      followers {
        username
      }
      ideaUser {
        content
        visibility
      }
      followRecived {
        requester {
          username
        }
      }
      followSend {
        toFollow {
          username
        }
      }
    }
  }
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_USER_DATA);
  const [display, setDisplay] = useState("none");

  if (loading) return <LoadingCircle />;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  return (
    <Flex direction="column">
      <Flex
        position="fixed"
        zIndex={20}
        w="100%"
        align="center"
        bg="gray.300"
        p="2"
        justify="space-around"
        boxShadow="lg"
      >
        <Image src="../public/logo_navbar.png" alt="logo_site" />

        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr="2"
          icon={<HamburgerIcon />}
          display={["flex", "flex", "flex", "none"]}
          onClick={() => setDisplay("flex")}
        />
      </Flex>

      <Flex
        w="100vw"
        bgColor="gray.50"
        zIndex={20}
        h="100vh"
        position="fixed"
        top="0"
        left="0"
        overflowY="auto"
        direction="column"
        display={display}
      >
        <Flex justify="flex-end">
          <IconButton
            mt="2"
            mr="2"
            aria-label="Close Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => setDisplay("none")}
          />
        </Flex>
        <Flex direction="column" align="center">
          <LinkButton name="Home" path="/dashboard" />
          <LinkButton name="Profile" path="/dashboard/profile" />
          <ButtonLogout />
        </Flex>
      </Flex>

      <Flex
        justify={["center", "center", "center", "space-between"]}
        height="100%"
      >
        <Flex
          direction="column"
          justify="center"
          width="20%"
          position="static"
          boxShadow="2xl"
          display={["none", "none", "none", "flex"]}
        >
          <LinkButton name="Home" path="/dashboard" />
          <LinkButton name="Profile" path="/dashboard/profile" />
          <ButtonLogout />
        </Flex>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          mt="10"
          width="60%"
        >
          <Outlet />
        </Flex>
        <Flex
          width="20%"
          position="static"
          boxShadow="2xl"
          display={["none", "none", "none", "flex"]}
        >
          <Text mt="20">Perfil Usuario</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
