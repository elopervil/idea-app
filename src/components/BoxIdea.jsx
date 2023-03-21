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
export default function BoxIdea(props) {
  let pD = new Date(props.date);
  return (
    <Card width={["md", "lg", "xl", "4xl"]} mt="10" boxShadow="2xl">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="" src="" />
            <Box>
              <Heading size="sm">{props.username}</Heading>
              <Text>{props.email}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <Divider />
      <CardBody>
        <Text>{props.content}</Text>
        <Text fontSize="sm">Date: {pD.toUTCString()}</Text>
      </CardBody>
    </Card>
  );
}
