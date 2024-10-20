// lib/withAuth.js

import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';

import useAuth from './useAuth';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading && !user) {
        redirect('/login');  
      }
    }, [user, loading]);

    if (loading) {
      return <div>Loading...</div>;  
    }

    if (!user) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
