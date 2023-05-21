import { useState } from "react";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/client";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { CHANGE_PASSWORD, GET_USER_DATA } from "../graphql/request";

export default function FormPassword() {
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  function changePasswordCallback() {
    changePassword({
      refetchQueries: [GET_USER_DATA],
      awaitRefetchQueries: true,
    });
  }

  const [onChange, onSubmit, values] = useForm(changePasswordCallback, {
    password: "",
  });

  const [changePassword, { data, loading, error }] = useMutation(
    CHANGE_PASSWORD,
    {
      update(proxy, { data: { changePassword: password } }) {
        console.log(password);
        setSuccess(password.success);
      },
      onError({ graphQLErrors }) {
        setErrors(graphQLErrors);
      },
      variables: values,
    }
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>New Password: </FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter new password..."
              onChange={onChange}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Change password
          </Button>
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
      {success && (
        <Alert status="info">
          <AlertIcon />
          <AlertDescription>Your password has been changed!</AlertDescription>
        </Alert>
      )}
    </>
  );
}
