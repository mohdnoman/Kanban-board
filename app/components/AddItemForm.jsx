import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";

const AddItemForm = ({
  isOpen,
  onClose,
  onSubmit,
  selectedColumnId,
  columns,
}) => {
  const [itemName, setItemName] = useState("");
  const [deadline, setDeadline] = useState(""); // State for deadline

  const handleSubmit = () => {
    if (selectedColumnId && itemName.trim() !== "") {
      onSubmit(selectedColumnId, itemName.trim(), deadline); // Pass deadline to onSubmit function
      setItemName("");
      setDeadline(""); // Reset deadline state
      onClose();
    } else {
      console.error("Invalid column ID or item name");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
          />
          <Input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            type="date" // Set input type to "date" for deadline
            placeholder="Select deadline"
            mt={2} // Add margin-top for separation
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddItemForm;
