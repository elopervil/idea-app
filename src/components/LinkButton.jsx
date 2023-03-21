import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function LinkButton(props) {
  return (
    <Link to={props.path}>
      <Button variant="ghost" aria-label={props.name} my="" w="100%">
        {props.name}
      </Button>
    </Link>
  );
}
