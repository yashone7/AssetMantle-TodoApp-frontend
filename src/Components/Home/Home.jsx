import { Box, Heading, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/app");
    }
  }, [navigate]);

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
