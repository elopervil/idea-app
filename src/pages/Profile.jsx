import {
  Flex,
  Box,
  Text,
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { MiniProfile } from "../components/MiniProfile";
import ButtonChangePassword from "../components/ButtonChangePassword";
import ButtonDeleteFollower from "../components/ButtonDeleteFollower";
import BoxIdea from "../components/BoxIdea";
import { useContext } from "react";
import { userDataContext } from "../context/userDataContext";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FOLLOW_UP_REQUEST } from "../graphql/request";
import { Notifications } from "../components/Notifications";
import LoadingCircle from "../components/LoadingCircle";

export function Profile() {
  const dataUser = useContext(userDataContext);

  const { data, loading, error } = useQuery(FOLLOW_UP_REQUEST);
  if (loading) return <LoadingCircle />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Flex direction="column" align="center" mt="20" height="100vh">
      <MiniProfile />
      <ButtonChangePassword />
      <Tabs isFitted minWidth={["sm", "md", "md", "xl"]} mt="5">
        <TabList mb="1em">
          <Tab>Ideas</Tab>
          <Tab>Following</Tab>
          <Tab>Followers</Tab>
          <Tab>Notifications</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex flexDirection="column">
              {dataUser.ideaUser.map((idea) => (
                <BoxIdea
                  ideaID={idea.id}
                  userID={idea.pubUser.id}
                  username={idea.pubUser.username}
                  email={idea.pubUser.email}
                  content={idea.content}
                  date={idea.pubDate}
                  visibility={idea.visibility}
                  key={idea.id}
                />
              ))}
            </Flex>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1, null, 2]} spacing="40px">
              {dataUser.following.map((user) => (
                <Link to={`/dashboard/profile/${user.username}`} key={user.id}>
                  <Box
                    height="80px"
                    width="15em"
                    shadow="2xl"
                    as={Button}
                    display={"flex"}
                    justifyContent={"start"}
                  >
                    <Avatar name={user.username} />
                    <Text ml="5">{user.username}</Text>
                  </Box>
                </Link>
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1, null, 2]} spacing="40px">
              {dataUser.followers.map((user) => (
                <Box
                  height="80px"
                  width="15em"
                  shadow="2xl"
                  as={Button}
                  display={"flex"}
                  justifyContent={"start"}
                >
                  <Link
                    to={`/dashboard/profile/${user.username}`}
                    key={user.id}
                  >
                    <Box
                      display={"flex"}
                      justifyContent={"start"}
                      alignItems={"center"}
                    >
                      <Avatar name={user.username} />
                      <Text ml="5">{user.username}</Text>
                    </Box>
                  </Link>
                  <ButtonDeleteFollower id={user.id} />
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <Notifications followList={data} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
