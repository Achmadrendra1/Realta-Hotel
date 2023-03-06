import { NextPage } from 'next';
import React from 'react';
import { useEffect } from 'react';

const withAuth = <P extends object>(WrappedComponent: NextPage<P>) => {
  return (props: P) => {
     

      useEffect(() => {
          const token = localStorage.getItem("token");
        //   console.log(token)
          if (!token) {
             window.location.href = "/users/login";
          }
      }, []);

      return <WrappedComponent {...props} />;
  }
}

export default withAuth;

