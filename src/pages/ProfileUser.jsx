import { Flex, Box, Stack, Text, Avatar } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { userDataContext } from "../context/userDataContext";
import { SEARCH_USERS } from "../graphql/request";
import { useQuery } from "@apollo/client";
import LoadingCircle from "../components/LoadingCircle";
import { ButtonFollow } from "../components/ButtonFollow";
import { ButtonUnfollow } from "../components/ButtonUnfollow";

export default function ProfileUser() {
  const [follow, setFollow] = useState(false);

  const dataUser = useContext(userDataContext);

  let { slug } = useParams();

  let userFollow = dataUser.following.find((user) => user.username === slug);
  let followSend = dataUser.followSend.find(
    (request) =>
      request.toFollow.username === slug && request.status === "PENDING"
  );
  console.log(followSend);

  const { data, loading, error } = useQuery(SEARCH_USERS, {
    variables: {
      username: slug,
    },
  });
  if (loading) return <LoadingCircle />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Flex direction="column" align="center" mt="20" height="100vh">
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
        <ButtonFollow />
      ) : (
        followSend.status === "PENDING" && (
          <Text mt="4" color="blue.500">
            Request Follow Up Pending
          </Text>
        )
      )}
    </Flex>
  );
}
