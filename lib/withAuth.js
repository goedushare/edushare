// lib/withAuth.js

import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';

import useAuth from './useAuth';
import { useEffect } from 'react';

// const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const { user, loading } = useAuth();

//     useEffect(() => {
//       if (!loading && !user) {
//         redirect('/login');  
//       }
//     }, [user, loading]);

//     if (loading) {
//       return <div>Loading...</div>;  
//     }

//     if (!user) {
//       return null; 
//     }

//     return <WrappedComponent {...props} />;
//   };
// };

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
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

  // Set display name for better debugging experience
  AuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};


export default withAuth;
