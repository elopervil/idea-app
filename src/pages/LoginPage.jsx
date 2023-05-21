import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { LOGIN_USER } from "../graphql/request";

const LoginPage = () => {
  let navigate = useNavigate();

  const context = useContext(AuthContext);

  const [errors, setErrors] = useState([]);

  function loginUserCallback() {
    tokenAuth();
  }

  const [onChange, onSubmit, values] = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [tokenAuth, { data, loading, error }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { tokenAuth: userData } }) {
      context.login(userData);
      navigate("/dashboard");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: values,
  });

  return (
    <Flex flexDirection="column" alignItems="center" mt="10">
      <Heading mb="5">Login</Heading>
      <Box w="sm">
        <form onSubmit={onSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={onChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={onChange}
              />
            </FormControl>
            <Button type="submit">Login</Button>
          </Stack>
        </form>
        {errors.map(function (error) {
          return (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error message:</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          );
        })}
      </Box>
      <Text
        mt="10"
        _hover={{
          color: "blue.500",
        }}
      >
        <Link to="/passwordrecovery">
          Can't remember your password? Click here
        </Link>
        .
      </Text>
    </Flex>
  );
};

export default LoginPage;
