import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = <P extends object>(WrappedComponent: NextPage<P>) => {
  return (props: P) => {
      const router = useRouter();

      useEffect(() => {
          const token = localStorage.getItem("token");
        //   console.log(token)
          if (!token) {
              router.push("/");
          }
      }, []);

      return <WrappedComponent {...props} />;
  }
}

export default withAuth;

