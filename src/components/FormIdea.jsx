import { useState } from "react";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/client";
import {
  FormControl,
  FormLabel,
  Button,
  Textarea,
  Select,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {
  ADD_IDEA,
  GET_LIST_ALL_IDEAS,
  GET_USER_DATA,
} from "../graphql/request";

export default function FormIdea(props) {
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);
  function addIdeaCallback() {
    addIdea({
      refetchQueries: [GET_LIST_ALL_IDEAS, GET_USER_DATA],
      awaitRefetchQueries: true,
    });
  }
  const [onChange, onSubmit, values] = useForm(addIdeaCallback, {
    content: "",
    visibility: "",
  });
  const [addIdea, { data, loading, error }] = useMutation(ADD_IDEA, {
    update(proxy, { data: { addIdea: ideaData } }) {
      console.log(ideaData);
      setSuccess(ideaData.success);
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: values,
  });
  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Text Idea:</FormLabel>
            <Textarea
              type="text"
              name="content"
              placeholder="Write your Idea..."
              onChange={onChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Visibility:</FormLabel>
            <Select
              placeholder="Select Visibility"
              name="visibility"
              onChange={onChange}
            >
              <option value="public">Public</option>
              <option value="protected">Protected</option>
              <option value="private">Private</option>
            </Select>
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Add Idea
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
          <AlertDescription>Idea posted successfully!</AlertDescription>
        </Alert>
      )}
    </>
  );
}
