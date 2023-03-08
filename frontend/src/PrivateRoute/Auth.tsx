import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';

const Auth = <P extends object>(WrappedComponent: NextPage<P>) => {
  return (props: P) => {  
      const router = useRouter()
      useEffect(() => {
          const token = localStorage.getItem("token");
          token && router.replace('/');
      });

      return <WrappedComponent {...props} />;
  }
}

export default Auth;

