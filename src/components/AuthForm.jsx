import React from "react";
import Logo from "./Logo";
import Form from "./Form";

const AuthForm = ({ type }) => {
  return (
    <div className="w-full">
      <Logo />
      <div className="my-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl text-gray-900 dark:text-gray-300 font-semibold">
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {type === "sign-in" ? "Sign in" : "Sign up"} to explore and share
          events.
        </p>
      </div>
      <Form type={type} />
    </div>
  );
};

export default AuthForm;
