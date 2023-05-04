import {
  Flex,
  Box,
  Stack,
  Text,
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Center,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { userDataContext } from "../context/userDataContext";
import { SEARCH_USERS } from "../graphql/request";
import { useQuery } from "@apollo/client";
import LoadingCircle from "../components/LoadingCircle";
import { ButtonFollow } from "../components/ButtonFollow";
import { ButtonUnfollow } from "../components/ButtonUnfollow";
import BoxIdea from "../components/BoxIdea";

export default function ProfileUser() {
  const dataUser = useContext(userDataContext);

  let { slug } = useParams();

  let userFollow = dataUser.following.find((user) => user.username === slug);
  let followSend = dataUser.followSend.find(
    (request) =>
      request.toFollow.username === slug && request.status === "PENDING"
  );

  const { data, loading, error } = useQuery(SEARCH_USERS, {
    variables: {
      username: slug,
    },
  });
  if (loading) return <LoadingCircle />;
  if (error) return <p>Error: {error.message}</p>;

  let ideaUser;
  if (userFollow) {
    ideaUser = data.searchUsers[0].ideaUser.filter(
      (idea) => idea.visibility != "PRIVATE"
    );
  } else {
    ideaUser = data.searchUsers[0].ideaUser.filter(
      (idea) => idea.visibility == "PUBLIC"
    );
  }

  console.log(data.searchUsers[0].following);

  return (
    <Flex
      direction="column"
      align="center"
      mt="20"
      minheight="100vh"
      width="100%"
    >
      <Box pt={4} align="center">
        <Avatar size="2xl" name={data.searchUsers[0].username} />
        <Stack mt={5}>
          <Text fontSize={25} fontWeight="bold">
            {data.searchUsers[0].username}
          </Text>
          <Text>{data.searchUsers[0].email}</Text>
          <Stack justifyContent="center" isInline>
            <Text fontWeight="bold">
              {data.searchUsers[0].followers.length}
            </Text>
            <Text color="gray.500">Followers</Text>
            <Text fontWeight="bold">
              {data.searchUsers[0].following.length}
            </Text>
            <Text color="gray.500">Following</Text>
          </Stack>
        </Stack>
      </Box>
      {userFollow ? (
        <ButtonUnfollow idUser={data.searchUsers[0].id} />
      ) : !followSend ? (
        <ButtonFollow idUser={data.searchUsers[0].id} />
      ) : (
        followSend.status === "PENDING" && (
          <Text mt="4" color="blue.500">
            Request Follow Up Pending
          </Text>
        )
      )}
      <Tabs isFitted minWidth={["sm", "md", "md", "xl"]} mt="5">
        <TabList mb="1em">
          <Tab>Ideas</Tab>
          <Tab>Following</Tab>
          <Tab>Followers</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex flexDirection="column">
              {ideaUser.map((idea) => (
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
              {data.searchUsers[0].following.map((user) => (
                <Link
                  to={
                    user.id === dataUser.id
                      ? "/dashboard/profile"
                      : `/dashboard/profile/${user.username}`
                  }
                  key={user.id}
                >
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
              {data.searchUsers[0].followers.map((user) => (
                <Link
                  to={
                    user.id === dataUser.id
                      ? "/dashboard/profile"
                      : `/dashboard/profile/${user.username}`
                  }
                  key={user.id}
                >
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
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
