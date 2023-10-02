import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import isEmpty from "lodash/isEmpty";
import { verifyToken } from "../actions";

function PublicRoute() {
  const { getUser, setUser } = useAuthStore();

  const user = getUser();

  // useEffect to send an api call to the server to verify the token
  // and logout the user if token is expired

  console.log(user, "public route");

  useEffect(() => {
    // make a http request to validate token here
    async function validateToken() {
      if (!isEmpty(user)) {
        const res = await verifyToken(user?.token);

        if (res.status === 401) {
          setUser({});
        }
      }
    }
    validateToken();
  }, [user]);

  return !user?.isAuthenticated ? <Outlet /> : <Navigate to="/app" replace />;
}

export default PublicRoute;
