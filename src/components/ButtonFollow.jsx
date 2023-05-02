import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

export function ButtonFollow(props) {
  return (
    <Button colorScheme="messenger" m="4" leftIcon={<AddIcon />}>
      Follow
    </Button>
  );
}
