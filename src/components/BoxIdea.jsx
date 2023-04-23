import { useContext } from "react";
import { userDataContext } from "../context/userDataContext";
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

export default function BoxIdea(props) {
  const userData = useContext(userDataContext);
  let pD = new Date(props.date);
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
          {props.userID === userData.id ? <EditIcon mr="2" /> : ""}
          {props.userID === userData.id ? <DeleteIcon mr="2" /> : ""}
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
