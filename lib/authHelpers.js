// lib/authHelpers.js

import { auth } from './firebaseConfig';

export const logout = () => {
  return auth.signOut();
};
