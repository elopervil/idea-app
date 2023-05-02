import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import {
  GET_LIST_ALL_IDEAS,
  GET_USER_DATA,
  SEARCH_USERS,
  UNFOLLOW,
} from "../graphql/request";
import { useMutation } from "@apollo/client";

export function ButtonUnfollow(props) {
  const [unfollow, { data, loading, error }] = useMutation(UNFOLLOW);

  const handleOnClickUnfollow = () => {
    unfollow({
      variables: {
        idUser: props.idUser,
      },
      refetchQueries: [GET_USER_DATA, SEARCH_USERS, GET_LIST_ALL_IDEAS],
      awaitRefetchQueries: true,
    });
  };
  return (
    <Button
      colorScheme="red"
      m="4"
      leftIcon={<CloseIcon />}
      onClick={handleOnClickUnfollow}
    >
      Unfollow
    </Button>
  );
}
