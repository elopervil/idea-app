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
import { FORGOTTEN_PASSWORD } from "../graphql/request";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { useForm } from "../utility/hooks";

export default function PasswordRecovery() {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  function passwordRecoveryCallback() {
    forgottenPassword();
  }

  const [onChange, onSubmit, values] = useForm(passwordRecoveryCallback, {
    email: "",
  });

  const [forgottenPassword, { loading, error, data }] = useLazyQuery(
    FORGOTTEN_PASSWORD,
    {
      variables: values,
    }
  );

  if (data) {
    return (
      <Alert
        status="success"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <AlertIcon />
        <AlertTitle>Alert:</AlertTitle>
        <AlertDescription>{data.forgottenPassword}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Flex flexDirection="column" alignItems="center" mt="10">
      <Heading mb="5">Password Recovery</Heading>
      <Text m="10">
        We will send a message to recover your password with instructions to
        follow.
      </Text>
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
            <Button type="submit">Send Email</Button>
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
}
