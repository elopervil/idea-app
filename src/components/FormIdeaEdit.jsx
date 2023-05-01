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
import { EDIT_IDEA, GET_LIST_ALL_IDEAS } from "../graphql/request";

export default function FormIdeaEdit(props) {
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  function editIdeaCallback() {
    editIdea({
      refetchQueries: [GET_LIST_ALL_IDEAS],
      awaitRefetchQueries: true,
    });
  }

  const [onChange, onSubmit, values] = useForm(editIdeaCallback, {
    id: props.idea.id,
    content: "",
    visibility: "",
  });
  const [editIdea, { data, loading, error }] = useMutation(EDIT_IDEA, {
    update(cache, { data: { editIdea: ideaData } }) {
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
              defaultValue={props.idea.content}
              type="text"
              name="content"
              placeholder="Edit your Idea..."
              onChange={onChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Visibility:</FormLabel>
            <Select
              placeholder="Select Visibility"
              name="visibility"
              onChange={onChange}
              defaultValue={props.idea.visibility.toLowerCase()}
            >
              <option value="public">Public</option>
              <option value="protected">Protected</option>
              <option value="private">Private</option>
            </Select>
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Edit Idea
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
          <AlertDescription>Idea successfully edited!</AlertDescription>
        </Alert>
      )}
    </>
  );
}
