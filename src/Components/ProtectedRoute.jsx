import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import isEmpty from "lodash/isEmpty";
import { verifyToken } from "../actions";

function ProtectedRoute() {
  const { getUser, setUser } = useAuthStore();

  const user = getUser();

  // useEffect to send an api call to the server to verify the token
  // and logout the user if token is expired

  console.log(user, "protected route");

  useEffect(() => {
    // make a http request to validate token here
    async function validateToken() {
      if (!isEmpty(user?.token)) {
        console.log(user?.token, "token pc");
        const res = await verifyToken(user?.token);

        if (res?.status === 401) {
          setUser({});
        }
      }
    }
    validateToken();
  }, [user, setUser]);

  return user?.isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
