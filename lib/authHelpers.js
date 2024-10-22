// lib/authHelpers.js

import { auth } from './firebaseConfig';
import { getDocumentById } from './firestoreHelpers';

export const logout = () => {
  return auth.signOut();
};

export const getCurrentUser = () => { 
  return auth.currentUser;
}

export const getUserById = (userId) => {
  try {
    const userObj = getDocumentById('users', userId)
    userObj.then((res) => {
      return res.data();
    });

  } catch (e) {
    console.error("Error fetching user: ", e);
  }
}


