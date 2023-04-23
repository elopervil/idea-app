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

const ADD_IDEA = gql`
  mutation addIdea($content: String!, $visibility: String!) {
    addIdea(content: $content, visibility: $visibility) {
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

export default function FormIdea(props) {
  const [errors, setErrors] = useState([]);

  function addIdeaCallback() {
    addIdea();
  }

  const [onChange, onSubmit, values] = useForm(addIdeaCallback, {
    content: "",
    visibility: "",
  });
  const [addIdea, { data, loading, error }] = useMutation(ADD_IDEA, {
    update(proxy, { data: { addIdea: ideaData } }) {
      console.log(ideaData);
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
              type="email"
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
          <Button type="submit">Add Idea</Button>
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
    </>
  );
}
