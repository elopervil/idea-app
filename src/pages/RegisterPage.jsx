import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";

const REGISTER_USER = gql`
  mutation register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      token
      success
      user {
        id
        username
        email
      }
    }
  }
`;

const RegisterPage = () => {
  let navigate = useNavigate();

  const context = useContext(AuthContext);

  const [errors, setErrors] = useState([]);

  function registerUserCallback() {
    register();
  }

  const [onChange, onSubmit, values] = useForm(registerUserCallback, {
    email: "",
    username: "",
    password: "",
  });

  const [register, { data, loading, error }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }) {
      console.log(userData);
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
      <Heading mb="5">Register</Heading>
      <Box w="sm">
        <form onSubmit={onSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={onChange}
              />
            </FormControl>
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
            <Button type="submit">Register</Button>
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
    </Flex>
  );
};

export default RegisterPage;
