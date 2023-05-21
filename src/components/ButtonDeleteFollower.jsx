import { useMutation } from "@apollo/client";
import { DELETE_FOLLOWER, GET_USER_DATA } from "../graphql/request";
import { SmallCloseIcon } from "@chakra-ui/icons";

export default function ButtonDeleteFollower(props) {
  const [removeFollower, { data, loading, error }] =
    useMutation(DELETE_FOLLOWER);

  const handleDeleteFollower = () => {
    removeFollower({
      variables: {
        idUser: props.id,
      },
      refetchQueries: [GET_USER_DATA],
      awaitRefetchQueries: true,
    });
  };
  return (
    <SmallCloseIcon ml="10" color="red.500" onClick={handleDeleteFollower} />
  );
}
