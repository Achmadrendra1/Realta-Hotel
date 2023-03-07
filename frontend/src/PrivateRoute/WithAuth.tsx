import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";

const withAuth = <P extends object>(WrappedComponent: NextPage<P>) => {
  return (props: P) => {
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/users/login";
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
