import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";
import { useDraggable } from "@dnd-kit/core";

const Item = ({ item, deleteItem, onDrop }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item?.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
      }
    : undefined;

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      key={item?.id}
      p={2}
      mb={2}
      borderWidth="1px"
      borderRadius="md"
      borderColor="gray.300"
      backgroundColor="white"
      boxShadow="sm"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex direction="column">
        <Text className="text-gray-800 font-sans font-medium">{item?.name}</Text>
        <Text className="text-sm text-gray-400">{item?.deadline}</Text>
      </Flex>
      <Icon
        as={MinusIcon}
        color="red.500"
        boxSize={4}
        cursor="pointer"
        onClick={deleteItem}
      />
    </Box>
  );
};

export default Item;
