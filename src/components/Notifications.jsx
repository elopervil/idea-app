import { useMutation } from "@apollo/client";
import {
  GET_LIST_ALL_IDEAS,
  GET_USER_DATA,
  FOLLOW_UP_REQUEST,
  RESPONSE_FOLLOW_REQUEST,
} from "../graphql/request";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Badge,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

export function Notifications(props) {
  const [responseFollowRequest, { data, loading, error }] = useMutation(
    RESPONSE_FOLLOW_REQUEST
  );

  return (
    <TableContainer>
      <Table variant="simple" size={["sm", "sm", "md", "lg"]}>
        <TableCaption>Notifications</TableCaption>
        <Thead>
          <Tr>
            <Th>Follow Request</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.followList.followUpRequest.map((request) => {
            if (request.status == "PENDING") {
              return (
                <Tr key={request.id}>
                  <Td>
                    {request.requester.username} has sent you a follow-up
                    request.
                  </Td>
                  <Td>
                    <Badge>Pending</Badge>
                    <CheckIcon
                      ml="2"
                      _hover={{
                        color: "green.500",
                        cursor: "pointer",
                        transition: "0.8s",
                      }}
                      onClick={() => {
                        responseFollowRequest({
                          variables: {
                            idRequest: request.id,
                            response: true,
                          },
                          refetchQueries: [
                            GET_LIST_ALL_IDEAS,
                            GET_USER_DATA,
                            FOLLOW_UP_REQUEST,
                          ],
                          awaitRefetchQueries: true,
                        });
                      }}
                    />
                    <CloseIcon
                      ml="2"
                      _hover={{
                        color: "red.500",
                        cursor: "pointer",
                        transition: "0.8s",
                      }}
                      onClick={() => {
                        responseFollowRequest({
                          variables: {
                            idRequest: request.id,
                            response: true,
                          },
                          refetchQueries: [
                            GET_LIST_ALL_IDEAS,
                            GET_USER_DATA,
                            FOLLOW_UP_REQUEST,
                          ],
                          awaitRefetchQueries: true,
                        });
                      }}
                    />
                  </Td>
                </Tr>
              );
            } else if (request.status == "ACCEPTED") {
              return (
                <Tr key={request.id}>
                  <Td>
                    {request.requester.username} has sent you a follow-up
                    request.
                  </Td>
                  <Td>
                    <Badge colorScheme="green">Accepted</Badge>
                  </Td>
                </Tr>
              );
            } else {
              return (
                <Tr key={request.id}>
                  <Td>
                    {request.requester.username} has sent you a follow-up
                    request.
                  </Td>
                  <Td>
                    <Badge colorScheme="red">Denied</Badge>
                  </Td>
                </Tr>
              );
            }
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
