import {
  CircularProgress,
  AbsoluteCenter,
  Heading,
  Flex,
} from "@chakra-ui/react";

const LoadingCircle = () => {
  return (
    <>
      <Flex
        w="100%"
        h="100vh"
        justify="center"
        align="center"
        direction="column"
      >
        <CircularProgress isIndeterminate color="gray.900" size="120px" />
        <Heading as="h3" size="lg">
          Loading...
        </Heading>
      </Flex>
    </>
  );
};

export default LoadingCircle;
