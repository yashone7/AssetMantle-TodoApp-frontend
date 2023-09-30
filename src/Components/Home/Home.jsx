import { Box, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Heading>Home page</Heading>
        <Link to="/login">
          <Button marginY="1em">Go to login page</Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Home;
