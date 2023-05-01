import { useContext, useState } from "react";
import { userDataContext } from "../context/userDataContext";
import { Box, Text, Stack, Avatar, AvatarBadge, Link } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { Link as LinkRouter } from "react-router-dom";

export function MiniProfile() {
  const dataUser = useContext(userDataContext);
  console.log(dataUser);
  let fowReq = dataUser.followRecived.filter(
    (follow) => follow.status == "PENDING"
  );
  const [followRequest, setFollowRequest] = useState(fowReq);

  return (
    <Box p={4} align="center">
      <Avatar size="2xl" name="" src="">
        <AvatarBadge boxSize="0.8em" bg="green.500" />
      </Avatar>
      <Stack mt={5}>
        <Text fontSize={25} fontWeight="bold">
          {dataUser.username}
        </Text>
        <Text>{dataUser.email}</Text>
        <Stack justifyContent="center" isInline>
          <Text fontWeight="bold">{dataUser.followers.length}</Text>
          <Text color="gray.500">Followers</Text>
          <Text fontWeight="bold">{dataUser.following.length}</Text>
          <Text color="gray.500">Following</Text>
        </Stack>
        <Stack justifyContent="center">
          {followRequest.length != 0 && (
            <Link
              as={LinkRouter}
              to="/dashboard/profile"
              color="green.500"
              alignItems="center"
              onClick={() => setFollowRequest([])}
            >
              <BellIcon /> +{followRequest.length} follow up request
            </Link>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
