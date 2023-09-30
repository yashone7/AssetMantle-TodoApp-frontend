import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { registerUser } from "../../actions";
import { useBearStore } from "../../store/useBearStore";

function Signup() {
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordInput.current.value !== confirmPasswordInput.current.value) {
      toast({
        title: "passwords don't match",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }

    // when passwords match -> proceed to create an account

    const res = await registerUser({
      email: emailInput.current.value,
      password: passwordInput.current.value,
      name: nameInput.current.value,
    });

    if (res) {
      toast({
        title: "user signed up successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top-right",
      });
    }

    setTimeout(() => {
      // navigate the user to login
      navigate("/login");
    }, 1200);
  };

  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const nameInput = useRef(null);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign up here</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" required ref={nameInput} />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" required ref={emailInput} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" required ref={passwordInput} />
              </FormControl>
              <FormControl id="confirm-password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" required ref={confirmPasswordInput} />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Create Accout
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  );
}

export default Signup;
