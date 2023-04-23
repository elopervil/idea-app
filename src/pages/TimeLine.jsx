import { useQuery, gql } from "@apollo/client";
import BoxIdea from "../components/BoxIdea";
import LoadingCircle from "../components/LoadingCircle";

const GET_LIST_ALL_IDEAS = gql`
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

export default function TimeLine() {
  const { loading, error, data } = useQuery(GET_LIST_ALL_IDEAS);

  if (loading) return <LoadingCircle />;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  return data.listAllIdeas.map((idea) => {
    return (
      <BoxIdea
        userID={idea.pubUser.id}
        username={idea.pubUser.username}
        email={idea.pubUser.email}
        content={idea.content}
        date={idea.pubDate}
        visibility={idea.visibility}
        key={idea.id}
      />
    );
  });
}
