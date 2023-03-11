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
} from "@chakra-ui/react";

const LOGIN_USER = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      payload
    }
  }
`;

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
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: values,
  });

  return (
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
          <Button type="submit">Submit</Button>
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
  );
};

export default LoginPage;
