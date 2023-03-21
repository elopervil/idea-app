import { CircularProgress, AbsoluteCenter, Heading } from "@chakra-ui/react";

const LoadingCircle = () => {
  return (
    <AbsoluteCenter>
      <CircularProgress isIndeterminate color="gray.900" size="120px" />;
      <Heading as="h3" size="lg">
        Loading...
      </Heading>
    </AbsoluteCenter>
  );
};

export default LoadingCircle;
