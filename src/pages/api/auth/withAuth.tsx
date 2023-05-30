// withAuth.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
// import api from './axiosAuth';
import axios from 'axios';

const withAuth = (Component: any) => {
  return function WithAuth(props: any) {
    const router = useRouter();

    useEffect(() => {
      async function checkAuth() {
        try {
          // Check if user is authenticated by sending a test request
          await axios.get(`${process.env.SERVER_URL}/account/auth`, {
            headers: {
              Authorization: localStorage.getItem('jwt'),
            },
          });

          // If the request succeeds, the user is authenticated
        } catch (error) {
          // If the request fails, the user is not authenticated
          router.replace('/error/unauthorized');
        }
      }

      checkAuth();
    }, []);

    return <Component {...props} />;
  };
};

export default withAuth;
