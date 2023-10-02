import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import App from "./App";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<PublicRoute />}
        errorElement={<h1>Not found</h1>}
      >
        <Route exact path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<PublicRoute />}>
        <Route exact path="/login" element={<Login />} />
      </Route>
      <Route path="/signup" element={<PublicRoute />}>
        <Route exact path="/signup" element={<Signup />} />
      </Route>
      <Route path="/app" element={<ProtectedRoute />}>
        <Route exact path="/app" element={<App />} />
      </Route>
    </>
  )
);
