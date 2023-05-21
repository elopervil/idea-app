import { useState } from "react";
import { userDataContext } from "../context/userDataContext";
import { useQuery } from "@apollo/client";
import { Flex, Image, IconButton, Text } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import ButtonLogout from "../components/ButtonLogout";
import LoadingCircle from "../components/LoadingCircle";
import LinkButton from "../components/LinkButton";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import ButtonIdea from "../components/ButtonIdea";
import { GET_USER_DATA } from "../graphql/request";
import { MiniProfile } from "../components/MiniProfile";

const Dashboard = () => {
  const location = useLocation();
  const { loading, error, data } = useQuery(GET_USER_DATA);
  const [display, setDisplay] = useState("none");

  if (loading) return <LoadingCircle />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Flex direction="column" minHeight="100vh">
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
            mr="4"
            aria-label="Close Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => setDisplay("none")}
          />
        </Flex>
        <Flex direction="column" align="center">
          <LinkButton
            name="Home"
            path="/dashboard"
            onPress={() => setDisplay("none")}
          />
          <LinkButton
            name="Profile"
            path="/dashboard/profile"
            onPress={() => setDisplay("none")}
          />
          <ButtonIdea onPress={() => setDisplay("none")} />
          <ButtonLogout />
        </Flex>
      </Flex>

      <Flex
        justify={["center", "center", "center", "space-between"]}
        minHeight="100vh"
      >
        <Flex
          direction="column"
          align="center"
          width="20%"
          position="static"
          boxShadow="2xl"
          display={["none", "none", "none", "flex"]}
        >
          <Flex
            direction="column"
            justify="center"
            mt="20"
            position="fixed"
            w="300px"
          >
            <LinkButton name="Home" path="/dashboard" />
            <LinkButton name="Profile" path={`/dashboard/profile`} />
            <ButtonIdea />
            <ButtonLogout />
          </Flex>
        </Flex>

        <Flex
          direction="column"
          alignItems="center"
          mt="10"
          mb="10"
          width="60%"
        >
          <userDataContext.Provider value={data.me}>
            <Outlet />
          </userDataContext.Provider>
        </Flex>

        <Flex
          width="20%"
          position="static"
          boxShadow="2xl"
          display={["none", "none", "none", "flex"]}
        >
          <Flex
            direction="column"
            justify="center"
            mt="20"
            position="fixed"
            width="300px"
            paddingLeft={"20"}
          >
            <userDataContext.Provider value={data.me}>
              {location.pathname != `/dashboard/profile` && <MiniProfile />}
            </userDataContext.Provider>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
