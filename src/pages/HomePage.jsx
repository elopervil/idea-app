import { Box, Image } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <div>
      <Box
        bg="gray.200"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="calc(100vh - 150px)"
      >
        <Image
          src="../public/logo_xxl_noback.png"
          alt="logo_site"
          border="2px"
          borderColor="gray.900"
          borderRadius="md"
          boxShadow="2xl"
        />
      </Box>
    </div>
  );
};

export default HomePage;
