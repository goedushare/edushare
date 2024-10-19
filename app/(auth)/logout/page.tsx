"use client";

import TextField from "@/components/TextField";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import useAuth from '@/lib/useAuth';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';
import { logout } from '@/lib/authHelpers';

const LogOut = () => {

  const handleLogout = async () => {
    try {
      await logout();  // Call the logout function
      redirect('/login');  // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogOut;

