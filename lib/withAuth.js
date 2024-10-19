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
        redirect('/login');  // Redirect to login page if not authenticated
      }
    }, [user, loading]);

    if (loading) {
      return <div>Loading...</div>;  // Show loading state while auth is being checked
    }

    if (!user) {
      return null;  // Don't render anything until redirect happens
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
