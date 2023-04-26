import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import FormIdeaEdit from "./FormIdeaEdit";

export default function ButtonIdeaEdit(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <EditIcon
        mr="2"
        _hover={{
          color: "blue.500",
          boxSize: "5",
          cursor: "pointer",
          transition: "0.8s",
        }}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Idea</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormIdeaEdit idea={props.idea} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
