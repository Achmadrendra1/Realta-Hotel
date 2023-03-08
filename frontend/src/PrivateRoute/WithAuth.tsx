import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";

const withAuth = <P extends object>(WrappedComponent: NextPage<P>) => {
  return (props: P) => {  
      const router = useRouter()
      useEffect(() => {
          const token = localStorage.getItem("token");
          !token && router.replace('../users/login');
          // if (!token) {
          //    router.push('../users/login')
          // }
      });

      return <WrappedComponent {...props} />;
  }
}

export default withAuth;
