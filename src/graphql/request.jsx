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
        id
        username
      }
      followers {
        id
        username
      }
      ideaUser {
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
        status
      }
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUsers($username: String!) {
    searchUsers(username: $username) {
      id
      email
      username
      following {
        id
        username
      }
      followers {
        id
        username
      }
      ideaUser {
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
  }
`;

export const FOLLOW_UP_REQUEST = gql`
  query {
    followUpRequest {
      id
      requester {
        id
        username
        email
      }
      status
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

export const CHANGE_PASSWORD = gql`
  mutation changePassword($password: String!) {
    changePassword(password: $password) {
      success
      error
    }
  }
`;

export const DELETE_FOLLOWER = gql`
  mutation removeFollower($idUser: ID!) {
    removeFollower(idUser: $idUser) {
      success
      message
      error
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

export const UNFOLLOW = gql`
  mutation unfollow($idUser: ID!) {
    unfollow(idUser: $idUser) {
      success
      message
      error
    }
  }
`;

export const SEND_FOLLOW_REQUEST = gql`
  mutation sendFollowRequest($idUser: ID!) {
    sendFollowRequest(idUser: $idUser) {
      success
      error
      message
      followRequest {
        toFollow {
          username
        }
        status
      }
    }
  }
`;

export const RESPONSE_FOLLOW_REQUEST = gql`
  mutation responseFollowRequest($idRequest: ID!, $response: Boolean!) {
    responseFollowRequest(idRequest: $idRequest, response: $response) {
      success
      error
      message
    }
  }
`;
