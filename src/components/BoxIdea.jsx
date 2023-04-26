import { useContext } from "react";
import { userDataContext } from "../context/userDataContext";
import { useMutation, gql } from "@apollo/client";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Heading,
  Box,
  Flex,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import FormIdea from "./FormIdea";
import ButtonIdeaEdit from "./ButtonIdeaEdit";

const DELETE_IDEA = gql`
  mutation deleteIdea($id: ID!) {
    deleteIdea(id: $id) {
      success
      error
      message
    }
  }
`;

export default function BoxIdea(props) {
  const userData = useContext(userDataContext);
  let pD = new Date(props.date);
  const [deleteIdea, { data, loading, error }] = useMutation(DELETE_IDEA);

  const handleOnClickDelete = () => {
    deleteIdea({
      variables: {
        id: props.ideaID,
      },
    });
    props.onDelete(props.ideaID);
  };

  return (
    <Card width={["sm", "lg", "xl", "2xl"]} mt="10" boxShadow="2xl">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="" src="" />
            <Box>
              <Heading size="sm">{props.username}</Heading>
              <Text>{props.email}</Text>
            </Box>
          </Flex>
          {props.userID === userData.id ? (
            <ButtonIdeaEdit
              idea={{
                id: props.ideaID,
                content: props.content,
                visibility: props.visibility,
              }}
            />
          ) : (
            ""
          )}
          {props.userID === userData.id ? (
            <DeleteIcon
              mr="2"
              _hover={{
                color: "red.500",
                boxSize: "5",
                cursor: "pointer",
                transition: "0.8s",
              }}
              onClick={handleOnClickDelete}
            />
          ) : (
            ""
          )}
        </Flex>
      </CardHeader>
      <Divider />
      <CardBody>
        <Text mb="3">{props.content}</Text>
        <Text fontSize="sm">Date: {pD.toUTCString()}</Text>
      </CardBody>
    </Card>
  );
}
