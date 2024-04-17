"use client";
import React, { useState, useRef } from "react";
import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  FormControl,
  FormLabel,
  Input,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

const AddColumnForm = ({ isOpen, onClose, addColumn,  }) => {
  const initialRef = useRef();

  const [columnName, setColumnName] = useState("");

  const handleSubmit = () => {
    if (!columnName.trim()) {
      return;
    }

    const columnId = uuidv4();
    const newColumn = {
      name: columnName,
      id: columnId,
      items: [], 
    };

    addColumn(newColumn);
    setColumnName("");
    onClose();
  };

  return (
    <AlertDialog
      leastDestructiveRef={initialRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Create New Container</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <FormControl>
            <FormLabel>Container Name</FormLabel>
            <Input
              ref={initialRef}
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              placeholder="Enter Container name"
            />
          </FormControl>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={initialRef} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            ml={3}
            onClick={handleSubmit}
            isDisabled={!columnName.trim()} // Disable the button if column name is empty or whitespace
          >
            Create
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddColumnForm;
