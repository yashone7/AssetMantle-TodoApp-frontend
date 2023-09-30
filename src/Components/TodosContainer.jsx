/* eslint-disable react/prop-types */
import {
  Box,
  Tag,
  Heading,
  Text,
  HStack,
  Card,
  Button,
} from "@chakra-ui/react";

function Todo({ task, description, isCompleted, onDelete, onEdit, id }) {
  return (
    <Card m={"1em"} w={"sm"} p={"1em"} minWidth={"sm"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Heading size={"xs"} maxWidth={"sm"}>
          {task}
        </Heading>
        <Tag
          colorScheme={isCompleted ? "green" : "red"}
          rounded={"xl"}
          textTransform={"uppercase"}
          size={"sm"}
        >
          {isCompleted ? "completed" : "pending"}
        </Tag>
      </Box>
      <Box
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        mt="2em"
      >
        <Text>{description}</Text>
        <HStack>
          <Button size={"xs"} onClick={(e) => onEdit(e, id)}>
            Edit
          </Button>
          <Button
            size={"xs"}
            colorScheme="red"
            onClick={(e) => onDelete(e, id)}
          >
            Delete
          </Button>
        </HStack>
      </Box>
    </Card>
  );
}

export default Todo;
