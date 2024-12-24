import React from "react";

const AuthForm = ({ type }) => {
  return (
    <div className="md:w-1/2 w-full order-2 md:order-1">
      <form>
        <input type="text" placeholder="Name" />
      </form>
    </div>
  );
};

export default AuthForm;
