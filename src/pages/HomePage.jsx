import { Box, Heading } from "@chakra-ui/react";

const HomePage = () => {
  console.log(localStorage.getItem("token"));
  return (
    <div>
      <Box
        bg="gray.200"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
        py={12}
      >
        <Heading as="h1" size="4xl" noOfLines={1} paddingBottom="5">
          Ideapp
        </Heading>
        <Heading as="h3" size="lg">
          Post your ideas
        </Heading>
      </Box>
    </div>
  );
};

export default HomePage;
