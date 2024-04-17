"use client";
import React from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Item from "./Item";


const Column = ({ name, items, deleteColumn, openItemDialog, id, deleteItem }) => {
  return (
    <Box
      className={`bg-slate-200 hover:bg-slate-100 hover:shadow-lg outline-2 outline-slate-400`}
      p={4}
      borderRadius="md"
      boxShadow="md"
      w="250px"
      maxH="400px"
      overflowY="auto"
    >
      <div className="flex justify-between align-middle items-center">
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          {name}
        </Text>
        <div style={{ cursor: "pointer" }} onClick={() => deleteColumn(id)}>
          <DeleteIcon color="red.500" />
        </div>
      </div>
      <Flex direction="column">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <Item item={item} key={item.id} deleteItem={() => deleteItem(id, item.id)}/>
          ))
        ) : (
          <Text>No items to display.</Text>
        )}
      </Flex>

      <Button
        mt={items && items.length === 0 ? 4 : 2}
        colorScheme="blue"
        onClick={() => openItemDialog(id)}
        _hover={{ bg: "blue.500" }}
        _active={{ bg: "blue.600" }}
        _focus={{ outline: "none" }}
        borderRadius="md"
        px={6}
        py={3}
        fontSize="sm"
        fontWeight="bold"
      >
        Add Item
      </Button>
    </Box>
  );
};

export default Column;
