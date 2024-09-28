import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  Button,
  ModalHeader,
} from "@chakra-ui/react";

interface ChangeUserModalProps {
  isOpen: boolean;
  text?: string;
  onClose: () => void;
  onClick: () => void;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onClick,
  text,
}: ChangeUserModalProps) {
  return (
    <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>{text}</ModalHeader>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="blue" onClick={onClick}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
