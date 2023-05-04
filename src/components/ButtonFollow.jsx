import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import {
  GET_LIST_ALL_IDEAS,
  GET_USER_DATA,
  SEARCH_USERS,
  SEND_FOLLOW_REQUEST,
} from "../graphql/request";
import { useMutation } from "@apollo/client";

export function ButtonFollow(props) {
  const [sendFollowRequest, { data, loading, error }] =
    useMutation(SEND_FOLLOW_REQUEST);

  const handleClickFollow = () => {
    sendFollowRequest({
      variables: {
        idUser: props.idUser,
      },
      refetchQueries: [GET_USER_DATA, SEARCH_USERS, GET_LIST_ALL_IDEAS],
      awaitRefetchQueries: true,
    });
  };
  return (
    <Button
      colorScheme="messenger"
      m="4"
      leftIcon={<AddIcon />}
      onClick={handleClickFollow}
    >
      Follow
    </Button>
  );
}
