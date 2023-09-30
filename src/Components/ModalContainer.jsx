/* eslint-disable react/prop-types */
import {
  FormControl,
  Input,
  FormLabel,
  Textarea,
  Button,
  Switch,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";

function ModalContainer({
  handleChange,
  task,
  description,
  handleSubmit,
  isOpen,
  handleClose,
  isNew,
  isCompleted,
}) {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isNew ? "Create Todo" : "Edit Todo"}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl my="1em">
              <FormLabel>Task</FormLabel>
              <Input
                type="text"
                id="task"
                onChange={handleChange}
                value={task}
                required
              />
            </FormControl>

            <FormControl my="1em">
              <FormLabel>Description</FormLabel>
              <Textarea
                id="description"
                onChange={handleChange}
                value={description}
                required
              />
            </FormControl>

            <FormControl
              display="flex"
              alignItems="center"
              my="1em"
              isDisabled={isNew}
            >
              <FormLabel htmlFor="isCompleted" mb="0">
                isCompleted?
              </FormLabel>
              <Switch
                id="isCompleted"
                checked={isCompleted}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" m="1em">
              Submit
            </Button>
            <Button type="button" m="1em" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ModalContainer;
