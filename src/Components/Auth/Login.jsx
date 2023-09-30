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
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions";
import { useAuthStore } from "../../store/useAuthStore";
import jwtDecode from "jwt-decode";

function Login() {
  const { user, setUser } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await loginUser({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });

    console.log(res);

    if (res) {
      const decodedToken = jwtDecode(res.token);
      console.log(decodedToken);
      setUser(decodedToken);
    }
  };

  console.log(user);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <form onSubmit={handleLogin}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" ref={emailInput} required />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" ref={passwordInput} required />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  {/* <Checkbox>Remember me</Checkbox> */}
                  <Link to="/signup" style={{ color: "#007AFF" }}>
                    Create Account
                  </Link>
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  );
}

export default Login;
