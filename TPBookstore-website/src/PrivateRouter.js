import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import NotFound from "./screens/NotFound";

// user
export function PrivateRouter({ component: Component, ...rest }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Route
      {...rest}
      component={(props) => {
        // const token = window.localStorage.getItem("userInfo");
        if (userInfo) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/login"} />;
        }
      }}
    />
  );
}
// admin
export function AdminPrivateRouter({ component: Component, ...rest }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Route
      {...rest}
      component={(props) => {
        if (userInfo && userInfo.isAdmin) {
          return <Component {...props} />;
        } else {
          return <NotFound />;
        }
      }}
    />
  );
}

// export default {PrivateRouter,AdminPrivateRouter};
