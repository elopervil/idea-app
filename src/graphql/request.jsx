import { gql } from "@apollo/client";

/* Queries */

export const GET_LIST_ALL_IDEAS = gql`
  query {
    listAllIdeas {
      id
      content
      visibility
      pubDate
      pubUser {
        id
        username
        email
      }
    }
  }
`;

export const GET_USER_DATA = gql`
  query {
    me {
      id
      email
      username
      following {
        username
      }
      followers {
        username
      }
      ideaUser {
        content
        visibility
      }
      followRecived {
        requester {
          username
        }
        status
      }
      followSend {
        toFollow {
          username
        }
      }
    }
  }
`;

/* Mutations */

export const LOGIN_USER = gql`
  mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      payload
    }
  }
`;

export const REGISTER_USER = gql`
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

export const DELETE_IDEA = gql`
  mutation deleteIdea($id: ID!) {
    deleteIdea(id: $id) {
      success
      error
      message
    }
  }
`;

export const ADD_IDEA = gql`
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

export const EDIT_IDEA = gql`
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
