import { Flex, Heading } from "@chakra-ui/react";
import { MiniProfile } from "../components/MiniProfile";

export function Profile() {
  return (
    <Flex direction="column" align="center" mt="20" height="100vh">
      <MiniProfile />
    </Flex>
  );
}
