import { useQuery, gql } from "@apollo/client";
import BoxIdea from "../components/BoxIdea";
import LoadingCircle from "../components/LoadingCircle";
import { useState, useEffect } from "react";
import { redirect, useLocation } from "react-router-dom";
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
  const location = useLocation();
  useEffect(() => {
    refetch();
  }, [location]);
  const [ideas, setIdeas] = useState([]);
  const { loading, error, data, refetch } = useQuery(GET_LIST_ALL_IDEAS, {
    onCompleted: (data) => setIdeas(data.listAllIdeas),
  });

  if (loading) return <LoadingCircle />;
  if (error) return <p>Error: {error.message}</p>;

  const handleModIdea = () => {
    refetch({
      onCompleted: () => redirect("/dashboard"),
    });
  };

  return data.listAllIdeas.map((idea) => {
    return (
      <BoxIdea
        ideaID={idea.id}
        userID={idea.pubUser.id}
        username={idea.pubUser.username}
        email={idea.pubUser.email}
        content={idea.content}
        date={idea.pubDate}
        visibility={idea.visibility}
        key={idea.id}
        onDelete={handleModIdea}
      />
    );
  });
}
