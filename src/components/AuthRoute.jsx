/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
// import MainPage from "../isl/main/Main";

function AuthRoute({ isLogin, component: Component, render, ...rest }) {
  useEffect(() => {
    console.log(`AuthRoute render path : ${rest.path} isLogin : ${isLogin}`);
    console.log(Component);
    console.log(rest);
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
export default AuthRoute;
