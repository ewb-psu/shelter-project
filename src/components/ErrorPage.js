/** @format */

import React from "react";

const ErrorPage = (props) => {
  return (
    <main className="w-full text-center mt-32">
      <p>{props.location.state.error.ok}</p>
      {props.location.state.error.status && (
        <p>Status: {props.location.state.error.status}</p>
      )}
      <p>{props.location.state.error.statusText}</p>
      <p>{props.location.state.error.message}</p>
    </main>
  );
};

export default ErrorPage;
