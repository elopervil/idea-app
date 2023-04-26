import { useState } from "react";
import { useForm } from "../utility/hooks";
import { useMutation, gql } from "@apollo/client";
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

const EDIT_IDEA = gql`
  mutation editIdea($id: ID!, $content: String!, $visibility: String!) {
    editIdea(id: $id, content: $content, visibility: $visibility) {
      success
      error
      idea {
        content
        visibility
        pubDate
      }
    }
  }
`;

export default function FormIdeaEdit(props) {
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  function editIdeaCallback() {
    editIdea();
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
